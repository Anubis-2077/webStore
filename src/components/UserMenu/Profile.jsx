
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Profile = () => {
  const [userData, setUserData] = useState({
    telefono: "",
    mail: "",
    direccion: "",
    fecha_nacimiento:"",
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
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateProfile = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/user/update/",
        userData, // Envía el estado actual de userData como el cuerpo de la petición
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Actualización exitosa", response.data);
      Swal.fire(
        'Cambios realizados',
        'Perfil actualizado con exito',
        'success'
      )

    } catch (error) {
      console.error("Error actualizando el usuario", error.response.data);
      const errorApi = JSON.stringify(error.response.data)
      Swal.fire (
        'Error',
        errorApi,
        'error'
      );
    }
  };

  const [showNavbar, setShowNavbar] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setShowNavbar(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showArrowBack, setShowArrowBack] = useState(window.innerWidth <= 500);

  const navigate = useNavigate();

  function irALaPaginaAnterior() {
    navigate(-1);
  }

  return (
    <div>
      {showNavbar && <Navbar />}
      

      <div>
        <div className="container rounded bg-white mt-5 mb-5 contenedor">
        
          <div className="row contenedor_profile">
          
            <div className="col-md-4 border-right">
            {showArrowBack && <ArrowBackIcon className="updateArrowBackIcon" onClick={irALaPaginaAnterior}/>}
              <div className="d-flex flex-column align-items-center text-center p-3">
              

                <span className="font-weight-bold username">
                  {userData.username}
                </span>
                <span className="text-black-50 mail">{userData.email}</span>
                <Link className="contraseña" to="/change_password">
                  Cambiar contraseña
                </Link>
                <span> </span>
              </div>
            </div>
            <div className="col-md-8 border-right mainFormContainerUpdate" >
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right tituloUpdate">Actualizar perfil</h4>
                </div>
                <div className="formContainerUpdateProfile">
                  <form >
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Telefono</label>
                      <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        placeholder="ingrese su telefono"
                        value={userData.telefono}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="ingrese su email"
                        name="email" // Asegúrate de agregar esto
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Dirección</label>
                      <input
                        type="text"
                        name="direccion"
                        className="form-control"
                        placeholder="ingrese su direccion con codigo postal"
                        value={userData.direccion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Fecha de nacimiento</label>
                      <input
                        type="date"
                        name="fecha_nacimiento"
                        className="form-control"
                        value={userData.fecha_nacimiento}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-outline-success w-100 successButtonUpdate"
                      style={{ fontSize: "25px", borderRadius: "10px" }}
                      type="button"
                      onClick={updateProfile}
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
    </div>
  );
};

export default Profile;
