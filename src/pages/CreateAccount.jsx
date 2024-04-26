import { useState } from 'react';
import './styles/LoginPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';





const CreateAccount = () =>{

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '', // Ajusta estos campos según los necesites
    dni: '',
    cuit:'',
    telefono:'',
    email:'',
    password:'',
    password2:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // e.target.name es el nombre del campo, e.target.value es el valor ingresado por el usuario
    setFormData(prevFormData => ({
      ...prevFormData, // Copia el estado anterior
      [name]: value, // Actualiza solo el campo que cambió, usando el nombre del campo como clave
    }));
  };





  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Primero, verificamos si las contraseñas coinciden
    
      
      // Si las contraseñas coinciden, procedemos a enviar los datos
      try {
        const response = await axios.post('http://localhost:8000/api/register/', formData);
        console.log('envio exitoso')
        console.log('estos son los datos enviados a la api:', formData)
        console.log(response.data);
        // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
      } catch (error) {
        console.log('estos son los errores:' ,error)
        console.log('estos son los datos enviados:',formData )
        const errorMessage = error.response && error.response.data && typeof error.response.data === 'object' ? 
        Object.values(error.response.data).join(' ') : 'Ocurrió un error desconocido.';
      Swal.fire(
        'Error',
        errorMessage,
        'error'
      );
        // Aquí puedes manejar errores, como mostrar un mensaje de error
      }
    
      // Aquí puedes manejar el caso de contraseñas no coincidentes
    }
  
  
  return(
        
              <div className='login_container_new_user'>
                <section className="ftco-section_new_user ">
                <div className="container_new_user justify-content-center">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                      <h2 className="heading-section">Vinoteca Lorem</h2>
                    </div>
                  </div>
                  <div className="row justify-content-center contenedor_texto_new_user" >
                    <div className="col-md-8 col-lg-10">
                      <div className="login-wrap p-0">
                        <h5 className="mb-4 text-center">Completa el formulario para crear una cuenta</h5>
                        <form action="#" className="signin-form" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input type="text" 
                            className="form_clase" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Usuario" required />
                          </div>
                          <div className="form-group">
                            <input type="text" 
                            className="form_clase" 
                            name="first_name" 
                            placeholder="Nombre"
                            value={formData.first_name}
                            onChange={handleChange}
                            required />
                          </div>
                          <div className="form-group">
                            <input type="text" 
                            className="form_clase" 
                            name="last_name" 
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Apellido" required />
                          </div>
                          <div className="form-group">
                            <input type="number" 
                            className="form_clase" 
                            name="dni" 
                            placeholder="D.N.I." 
                            value={formData.dni}
                            onChange={handleChange}
                            required />
                          </div>
                          <div className="form-group">
                            <input type="number" 
                            className="form_clase" 
                            name="cuit" 
                            placeholder="Cuit - Cuil" 
                            value={formData.cuit}
                            onChange={handleChange}
                            required />
                          </div>
                          
                          <div className="form-group">
                            <input type="number" 
                            className="form_clase" 
                            name="telefono" 
                            placeholder="Telefono" 
                            value={formData.telefono}
                            onChange={handleChange}
                            required />
                          </div>
                          <div className="form-group">
                            <input type="email" 
                            className="form_clase" 
                            name="email" 
                            placeholder="E-mail" 
                            value={formData.email}
                            onChange={handleChange}
                            required />
                          </div>
                          <div className="form-group">
                            <input id="password-field" 
                            type="password" 
                            className="form_clase" 
                            name='password' 
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required />
                            <span  className="fa fa-fw fa-eye field-icon toggle-password" style={{color: '#FFFFFF !important'}}></span>
                          </div>
                          <div className="form-group">
                            <input id="password-field" 
                            type="password" 
                            name='password2'
                            className="form_clase" 
                            placeholder="confirmar contraseña" 
                            value={formData.password2}
                            onChange={handleChange}
                            required />
                            <span  className="fa fa-fw fa-eye field-icon toggle-password" style={{color: '#FFFFFF !important'}}></span>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="form_clase btn btn-primary submit px-3">Crear cuenta</button>
                          </div>
                          <div className=" d-md-flex contenedor_opciones">
                            
                            <div className="w-100 text-md-right">
                              
                            </div>
                            
                          </div>
                          <div className=" d-md-flex contenedor_opciones">
                            
                            
                            
                          </div>
                        </form>
                        
                        <div className="social d-flex text-center">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              </div>
              
    )
}

export default CreateAccount