
import { Link, useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import axios from 'axios';
import {useAuth} from '../context/UseAuth';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: '',
    password:'',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target; // e.target.name es el nombre del campo, e.target.value es el valor ingresado por el usuario
    setLoginData(prevLoginData => ({
      ...prevLoginData, // Copia el estado anterior
      [name]: value, // Actualiza solo el campo que cambió, usando el nombre del campo como clave
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario si es llamado desde onSubmit

    try{
      await login(loginData);
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', loginData); 
      console.log('envio exitoso')
      console.log('estos son los datos enviados a la api:', loginData)
      console.log(response.data);
      navigate ('/');

    } catch(error){
      console.log('estos son los errores:' ,error)
      console.log('estos son los datos enviados:',loginData )
      const loginError = 'El usuario o la contraseña son incorrectos pruebe nuevamente'
      
    Swal.fire(
      'Error',
      loginError,
      'error');
    }
  };
  

  return (
    <div className='login_container'>
      <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="row-md-6 text-center mb-5">
            <h2 className="heading-section">Online Store</h2>
          </div>
        </div>
        <div className="row justify-content-center contenedor_texto">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Inicia sesión</h3>
              <form action="#" className="signin-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <input type="text" 
                  className="form_clase" 
                  placeholder="Username" 
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  required />
                </div>
                <div className="form-group">
                  <input id="password-field" 
                  type="password" 
                  className="form_clase" 
                  placeholder="Password" 
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required />
                  <span  className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
                <div className="form-group">
                  <button type="submit" className="form_clase btn btn-primary submit px-3" >Iniciar sesión</button>
                </div>
                <div className=" d-md-flex contenedor_opciones">
                  
                  <div className="w-100 text-md-right">
                    <Link href="#" >Olvido su contraseña?</Link>
                  </div>
                  
                </div>
                <div className=" d-md-flex contenedor_opciones">
                  
                  <div className="w-100 text-md-right">
                    <Link to="/create_account" >Crear cuenta</Link>
                  </div>
                  
                </div>
              </form>
              <p className="w-100 text-center">&mdash; O inicia sesión con &mdash;</p>
              <div className="social d-flex text-center">
                <a href="#" className="px-2 py-2 mr-md-1 "><FacebookIcon/> Facebook</a>
                <a href="#" className="px-2 py-2 ml-md-1 "><GoogleIcon/> Google</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    
  );
};

export default LoginPage;
