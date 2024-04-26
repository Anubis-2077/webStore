
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from "../Navbar/Navbar";


const PasswordChange = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user/data/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Corrección aquí
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data);
        console.log("datos recibidos exitosamente", response.data.username); // Cambio aquí para loguear directamente desde response.data
      } catch (error) {
        console.error("Hubo un error al obtener los datos del usuario:", error);
        // Manejar el error o redirigir al usuario a la pantalla de login
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    
    
    if (newPassword !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      Swal.fire(
        'Error',
        'Las contraseñas no coinciden',
        'error',
      );
      return;
    }
  
    // Aquí llamas a changePassword si todo está correcto
    await changePassword(oldPassword, newPassword);
  };

  const changePassword = async () => {
     // Prevenir el comportamiento predeterminado del formulario
    const token = localStorage.getItem('token');
    const { oldPassword, newPassword, confirmPassword } = passwordData; // Asumiendo que has añadido confirmPassword al estado

    

    try {
        const response = await axios.post('http://localhost:8000/dj-rest-auth/password/change/', {
            old_password: oldPassword,
            new_password1: newPassword,
            new_password2: confirmPassword, // Aquí debería ser igual a newPassword, es solo para confirmar
        }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        

        console.log('Cambio de contraseña exitoso', response.data);
        Swal.fire(
            'Exito',
            'La contraseña se cambio correctamente',
            'success'
        );
        navigate('/user_profile')
    } catch (error) {
        console.error('Error al cambiar la contraseña', error.response);
        // Suponiendo que el backend envía mensajes de error en error.response.data
        const errorMessage = error.response && error.response.data && Object.values(error.response.data).join(" ");
        Swal.fire('Error', errorMessage || 'Hubo un problema al cambiar la contraseña. Por favor, intenta nuevamente.', 'error');
    }
};

  return (
    <div>
      <Navbar/>
      <div>
        <div className="container rounded bg-white mt-5 mb-5 contenedor">
          <div className="row contenedor_profile">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <span className="font-weight-bold username">
                  {userData.username}
                </span>
                <span className="text-black-50 mail">{userData.email}</span>
                
                
              </div>
            </div>
            <div className="col-md-8 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Cambiar contraseña</h4>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="row mt-3">
                    <div className="col-md-12">
                        <label className="labels">contraseña actual</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="contraseña actual"
                        
                        name="oldPassword"
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">nueva contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="nueva contraseña"
                        name="newPassword"
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">confirmar contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="confirmar contraseña"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        />
                    </div>
                    
                    
                    
                    </div>

                    <div className="mt-5 text-center">
                    <button
                        className="btn btn-outline-success w-100"
                        style={{ fontSize: "25px", borderRadius: "10px" }}
                        type="submit"
                    >
                        Guardar cambios
                    </button>
                    </div>
                    
                </form>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
