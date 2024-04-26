
import "./styles/ProductPages.css";
import Input from "../components/Input/Input";
import TextArea from "../components/Input/TextArea";
import Select from "../components/Input/Select";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ProductPublishPage = () => {
  const { id } = useParams(); // Obtiene el ID del producto de la URL si existe
  const isEditMode = !!id; // Convierte el ID a un valor booleano para saber si estamos en modo edición
  const token = localStorage.getItem("token");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Obtiene el primer archivo
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/product/update/${id}/`,
            {
              headers: { Authorization: `Token ${token}` },
            }
          );
          setFormValues({
            nombre: response.data.nombre,
            categoria: response.data.categoria,
            descripcion: response.data.descripcion,
            cantidad: response.data.cantidad,
            precio: response.data.precio,
          });
          // Asume que tienes un estado para la URL de la imagen si necesitas manejarla separadamente
        } catch (error) {
          console.error("Error al cargar el producto", error);
          Swal.fire(
            "Error",
            "No se pudo cargar la información del producto",
            "error"
          );
        }
      };

      fetchProductData();
    }
  }, [id, token, isEditMode]);

  // Efecto para restablecer el formulario solo en modo de creación
  useEffect(() => {
    if (!isEditMode) {
      setFormValues({
        nombre: "",
        categoria: "",
        descripcion: "",
        cantidad: "",
        precio: "",
      });
    }
  }, [isEditMode]); // Depende solo de isEditMode

  // Efecto para cargar las categorías, independientemente del modo
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/category/get/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const options = response.data.map((cat) => ({
          value: cat.id, // Asegúrate de corregir "cat.di" a "cat.id"
          label: cat.nombre,
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.error("error al cargar las categorias", error);
        Swal.fire("Error", "hubo un error al cargar las categorias", "error");
      }
    };

    loadCategories();
  }, [token]); // Depende solo de token

  // Llama a loadCategories

  const [formValues, setFormValues] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    cantidad: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Asegúrate de corregir el typo aquí de preventDEfault a preventDefault

    const formDataToSend = new FormData();
    formDataToSend.append("precio", formValues.precio);
    formDataToSend.append("nombre", formValues.nombre);
    formDataToSend.append("descripcion", formValues.descripcion);
    formDataToSend.append("cantidad", formValues.cantidad);
    formDataToSend.append("categoria", formValues.categoria);
    // No necesitas añadir "precio" nuevamente, ya está incluido arriba
    // formDataToSend.append("precio", formValues.precio);

    if (file) {
      formDataToSend.append("imagen", file);
    }
    if (!isEditMode) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/product/create/",
          formDataToSend,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        Swal.fire(
          "Producto creado",
          "Se creó el producto con éxito",
          "success"
        );
        // Restablecer el formulario y limpiar el archivo seleccionado después del éxito
        setFormValues({
          nombre: "",
          categoria: "",
          descripcion: "",
          stock: "",
          cantidad: "",
          precio: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }
      }
    } else {
      try {
        await axios.patch(
          `http://127.0.0.1:8000/product/update/${id}/`,
          formDataToSend,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        Swal.fire(
          "Producto actualizado",
          "Se actualizo el producto con éxito",
          "success"
        );
        // Restablecer el formulario y limpiar el archivo seleccionado después del éxito
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }
      }
    }
  };

  const textChoice = (isEditMode) => {
    if (isEditMode) {
      return {
        titulo: "Actualizar producto",
        boton: "Actualizar",
      };
    } else {
      return {
        titulo: "Publicar producto",
        boton: "Publicar",
      };
    }
  };

  const { titulo, boton } = textChoice(isEditMode);

 
  const [showArrowBack, setShowArrowBack] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setShowNavbar(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(-1);
  }

  return (
    <>
      <div className="mainContainerPublish">
        
        {showArrowBack && <ArrowBackIcon className="ArrowBackPublish" onClick={handleNavigate}/>}
        <div className="cuerpo">
          <div className="card formContainerPublish">
            <div className="card-header cardHeaderPublish">
              <h3>{titulo}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <Input
                  label="Imagen"
                  type="file"
                  onChange={handleFileChange}
                  name="imagen"
                  ref={fileInputRef}
                />
                <Input
                  label="Nombre"
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  required
                  name="nombre"
                  onChange={handleChange}
                  value={formValues.nombre}
                />
                <Select
                  label="Categoría"
                  options={categoryOptions}
                  name="categoria"
                  onChange={handleChange}
                  value={formValues.categoria}
                />
                <Input
                  label="Precio"
                  type="number"
                  placeholder="Ingrese el precio del producto"
                  required
                  name="precio"
                  onChange={handleChange}
                  value={formValues.precio}
                />
                <Input
                  label="Stock disponible"
                  type="number"
                  placeholder="Ingrese el stock disponible"
                  required
                  name="cantidad"
                  onChange={handleChange}
                  value={formValues.cantidad}
                />
                <TextArea
                  label="descripcion"
                  cols="30"
                  rows="5"
                  name="descripcion"
                  onChange={handleChange}
                  value={formValues.descripcion}
                  maxlength="350"
                />

                <button
                  type="submit"
                  className="btn btn-lg btn-outline-success w-100 buttonPublishPage"
                >
                  {boton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPublishPage;
