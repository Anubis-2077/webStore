import axios from "axios";
import CustomInput from "../components/Dashboard/CustomInput";
import { useState, useEffect } from "react";
import "./styles/DetalleEnvioPage.css";
import { Box, Heading,Container,SimpleGrid,Button,Select, FormControl, FormLabel  } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

const DetalleEnvioPage = () => {
    const { id } = useParams();
  const token = localStorage.getItem("token");
  const [detalleEnvio, setDetalleEnvio] = useState(null);
  const [formData, setFormData] = useState({
    prestador: "",
    numero_envio: "",
    estado: "",
  });

  const [formErrors, setFormErrors] = useState({
    prestador: false,
    numero_envio: false,
    estado : false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "prestador":
      case "numero_envio":
        return /[""]/.test(value) || !value; 

      default:
        return false;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};
    let isValid = true;

    // Validar cada campo utilizando validateField
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      errors[key] = error;
      if (error) isValid = false; // Si algún campo tiene error, marca como no válido
    });

    setFormErrors(errors); // Actualiza los errores de formulario

    if (isValid) {
      try {
        const envioResponse = await axios.put(
          `http://127.0.0.1:8000/api/envios/${id}/`,
          formData,{
            headers: {
              Authorization: `Token ${token}`
            }
          }
          
        );
        
        console.log(envioResponse.data)
        

        alert("Formulario valido");
        console.log('estos son los datos del formulario: ', formData)

        // Resetear el formulario si todo fue correcto
        setFormData({
          prestador: "",
          numero_envio: "",
          estado: "",
        });
      } catch (error) {
        console.error(
          "Error al enviar el formulario o crear la preferencia de pago:",
          error
        );
      }
    } else {
      console.log("Errores en el formulario, no se envía.", errors);
    }
  };

  useEffect(() => {
    const detalleEnvioapi = async () => {
      try {
        // Asegúrate de usar paréntesis para encerrar el objeto de configuración de axios
        const response = await axios.get(`http://127.0.0.1:8000/api/detalle_envios/${id}/`, {
            headers: {
              Authorization: `Token ${token}`
            }
        });
        setDetalleEnvio(response.data);
        setFormData({
          prestador: response.data.prestador || "",
          numero_envio: response.data.numero_envio || "",
          estado: response.data.estado || "Pendiente" 
        });
        console.log('estos son los detalles de la API: ', response.data);
      } catch (errors) {
        console.error('estos son los errores al tratar de obtener los datos: ', errors);
      }
    };

    if (id) { 
      detalleEnvioapi();
    }
  }, [id, token]);


  


  return (
    <div className="DetalleEnvioPage">
        <Container maxW="50%" id="formContainerDetalleEnvio" >
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        className="DetalleEnvioPageForm"
      >
        <Heading as="h2" size="lg" textAlign="center" color="black" mb={6} className="Titulo">
          Actualiza los datos del envio.
        </Heading>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={1} spacing={2}>
            <CustomInput
              name="cliente"
              type="text"
              label="cliente"
              value={detalleEnvio ? `${detalleEnvio.cliente.nombre} ${detalleEnvio.cliente.apellido}` : ''}
              id="CustomInputEnvio"
              
            />
            <CustomInput
              id="prestador"
              name="prestador"
              type="text"
              label="Prestador de servicio de correo"
              isRequired={true}
              helperText="Currier de correo"
              errorText="Este campo es obligatorio"
              isError={formErrors.prestador}
              value={formData.prestador}
              onChange={handleChange}
              
            />
            <CustomInput
              id="numero_envio"
              name="numero_envio"
              type="text"
              label="Número de envío"
              isRequired={true}
              helperText="Introduce el numero de envio"
              errorText="El numero de envio es obligatorio"
              isError={formErrors.numero_envio}
              value={formData.numero_envio}
              onChange={handleChange}
            />
            <FormControl>
                <FormLabel>Ingrese el estado del envío</FormLabel>
            </FormControl>
            <Select style={{border:' solid 1px black'}}
            onChange={handleChange}
            id="estado"
            name="estado"
            value={formData.estado}>
                
            <option value='pendiente'>Pendiente</option>
            <option value='enviado'>Enviado</option>
            
            </Select>
            
            
          </SimpleGrid>
          <Button mt={10} width='100%' colorScheme="red" type="submit" className="btn btn-outline-info" >
            Enviar
          </Button>
        </form>
      </Box>
    </Container>

    </div>
  )
};
export default DetalleEnvioPage;
