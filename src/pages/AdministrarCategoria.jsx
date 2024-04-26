
import "./styles/ProductPages.css";
import Input from "../components/Input/Input";
import TextArea from "../components/Input/TextArea";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AdministrarCategoria = () =>{
    const {id} = useParams();
    const isEditMode = !!id;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const token = localStorage.getItem('token');

    

    useEffect (()=>{
        if(isEditMode){
            const updateEditForm = async () => {
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/category/update/${id}/`, {
                    headers: { Authorization: `Token ${token}` },
                  });

                setNombre (response.data.nombre
                    
                )
                setDescripcion(
                    response.data.descripcion
                );
                console.log('estos son los datos recibidos: ',response.data )
                } catch (error) {
                    console.log('este es el error: ', error)
                    Swal.fire('Error', 'Hubo un error al cargar los datos del formulario', 'error');
                }
            };
            updateEditForm();
        }
    },[id, token, isEditMode]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditMode){
            try {
                axios.post(`http://127.0.0.1:8000/category/create/`, {
                    nombre,
                    descripcion,
                }, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                console.log('este es el token', token)
                
        
                Swal.fire(
                    '¡Publicado!',
                    'La categoría ha sido creada exitosamente.',
                    'success'
                );
                setNombre('');
                setDescripcion('');
        
                // Opcional: Resetear el formulario o redireccionar al usuario
            } catch (error) {
                console.error('Hubo un error al publicar la categoría:', error);
                Swal.fire(
                    'Error',
                    'No se pudo crear la categoría.',
                    'error'
                    
                );
                
            }
        }else{
            try {
                axios.patch(`http://127.0.0.1:8000/category/update/${id}/`, {
                    nombre,
                    descripcion,
                }, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                
                
        
                Swal.fire(
                    'Categoria actualizada',
                    'La categoría ha sido actualizada exitosamente.',
                    'success'
                );
                
        
                // Opcional: Resetear el formulario o redireccionar al usuario
            } catch (error) {
                console.error('Hubo un error al actualizar la categoría:', error);
                Swal.fire(
                    'Error',
                    'No se pudo actualizar la categoría.',
                    'error'
                    
                );
                
            }
        }
    
        
    };

    const [showArrowBack, setShowArrowBack] = useState(window.innerWidth <= 500);

    

  useEffect(() => {
    const handleResize = () => {
      setShowArrowBack(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    const navigate = useNavigate();

    const handleNavigate = ()=>{
        navigate(-1)
    }
    
    return(
            <div className="cuerpo cuerpoAdminCategoria">
                
                {showArrowBack && <ArrowBackIcon className="arrowBackCategoryPage" onClick={handleNavigate} />}
                <div className="card cardCategoryPage">
                    <div className="card-header headerCategoryPage">
                        <h3>Crear categoría</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                        
                        <Input label ="Nombre" 
                        type="text" 
                        placeholder="Ingrese el nombre de la categoria"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}  
                        required  />

                        <TextArea label="Descripcion" 
                        placeholder="Ingrese una descripcion de la categoria"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        style={{'height':'10rem'}}
                        
                        />

                        <button type="submit" className="btn btn-lg btn-outline-success w-100 buttonCategoryPage">Publicar</button>
                        
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AdministrarCategoria
