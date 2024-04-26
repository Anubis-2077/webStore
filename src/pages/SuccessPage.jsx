import { Container, Button, SimpleGrid, Box, Heading } from "@chakra-ui/react";
import "./styles/SuccessPage.css";
import CustomInput from "../components/Dashboard/CustomInput";
import { useState } from "react";
import axios from "axios";

const SuccessPage = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    cuit: "",
    codigo_postal: "",
    localidad: "",
    provincia: "",
    calle: "",
    numero: "",
    email: "",
    departamento: "",
  });

  const [formErrors, setFormErrors] = useState({
    nombre: false,
    apellido: false,
    telefono: false,
    cuit: false,
    codigo_postal: false,
    localidad: false,
    provincia: false,
    calle: false,
    numero: false,
    departamento: false,
    email: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "nombre":
      case "apellido":
      case "calle":
      case "localidad":
      case "provincia":
        return /[0-9]/.test(value) || !value; // Verifica que no haya números y no esté vacío
      case "telefono":
      case "cuit":
      case "codigo_postal":
      case "numero":
        return !/^\d+$/.test(value) || !value; // Verifica que solo haya dígitos y no esté vacío
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
        const clientResponse = await axios.post(
          "http://127.0.0.1:8000/api/cliente/upsert/",
          formData
        );

        // Si el cliente se crea correctamente, obtenemos el ID directamente de la respuesta
        const clienteId = clientResponse.data.id;

        const cartId = localStorage.getItem("cartId"); // Obtener el cartId de localStorage
        if (cartId && clienteId) {
          const prefResponse = await axios.post(
            `http://127.0.0.1:8000/api/crear-preferencia/`,
            {
              cart_id: cartId,
              cliente_id: clienteId,
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          );
          window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${prefResponse.data.preference_id}`;
        }

        // Resetear el formulario si todo fue correcto
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          cuit: "",
          email: "",
          departamento: "",
          codigo_postal: "",
          localidad: "",
          provincia: "",
          calle: "",
          numero: "",
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

  return (
    <div className="successPageContainer">
      <Container className="successContainer">
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          className="SimpleGridSuccess"
        >
          <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
            Completa los datos para gestionar tu envío.
          </Heading>
          <form onSubmit={handleSubmit}>
            <SimpleGrid
              columns={1}
              spacing={2}
              className="formContainerSuccess"
            >
              <CustomInput
                id="nombre"
                name="nombre"
                type="text"
                label="Nombre"
                isRequired={true}
                helperText="Introduce tu nombre"
                errorText="El nombre es obligatorio y no debe contener números"
                isError={formErrors.nombre}
                value={formData.nombre}
                onChange={handleChange}
              />

              <CustomInput
                id="apellido"
                name="apellido"
                type="text"
                label="Apellido"
                isRequired={true}
                helperText="Introduce tu apellido"
                errorText="El apellido es obligatorio y no debe contener números"
                isError={formErrors.apellido}
                value={formData.apellido}
                onChange={handleChange}
              />
              <CustomInput
                id="cuit"
                name="cuit"
                type="number"
                label="CUIT / CUIL"
                isRequired={true}
                helperText="Introduce tu CUIT / CUIL"
                errorText="El CUIT / CUIL es obligatorio"
                isError={formErrors.cuit}
                value={formData.cuit}
                onChange={handleChange}
              />
              <CustomInput
                id="telefono"
                name="telefono"
                type="number"
                label="Telefono"
                isRequired={true}
                helperText="Introduce tu telefono"
                errorText="El telefono es obligatorio"
                isError={formErrors.telefono}
                value={formData.telefono}
                onChange={handleChange}
              />
              <CustomInput
                id="email"
                name="email"
                type="email"
                label="E-mail"
                isRequired={true}
                helperText="Introduce tu email"
                errorText="El email es obligatorio"
                value={formData.email}
                onChange={handleChange}
              />
              <CustomInput
                id="calle"
                name="calle"
                type="text"
                label="Calle"
                isRequired={true}
                helperText="Introduce la calle de tu domicilio"
                errorText="La calle es obligatoria"
                isError={formErrors.calle}
                value={formData.calle}
                onChange={handleChange}
              />
              <CustomInput
                id="numero"
                name="numero"
                type="number"
                label="Numeración"
                isRequired={true}
                errorText="La numeración es obligatoria"
                isError={formErrors.numero}
                value={formData.numero}
                onChange={handleChange}
              />
              <CustomInput
                id="departamento"
                name="departamento"
                type="text"
                label="Departamento"
                helperText="Numero de departamento"
                errorText=""
                isError={formErrors.departamento}
                value={formData.departamento}
                onChange={handleChange}
              />
              <CustomInput
                id="codigo_postal"
                name="codigo_postal"
                type="number"
                label="Codigo postal"
                isRequired={true}
                helperText="Introduce tu codigo postal"
                errorText="La calle es obligatoria"
                isError={formErrors.codigo_postal}
                value={formData.codigo_postal}
                onChange={handleChange}
              />
              <CustomInput
                id="localidad"
                name="localidad"
                type="text"
                label="Localidad"
                isRequired={true}
                helperText="Introduce tu localidad"
                errorText="La localidad es obligatoria"
                isError={formErrors.localidad}
                value={formData.localidad}
                onChange={handleChange}
              />
              <CustomInput
                id="provincia"
                name="provincia"
                type="text"
                label="Provincia"
                isRequired={true}
                helperText="Introduce tu provincia"
                errorText="La provincia es obligatoria"
                isError={formErrors.provincia}
                value={formData.provincia}
                onChange={handleChange}
              />
            </SimpleGrid>
            <Button
              mt={4}
              colorScheme="red"
              type="submit"
              className="submitbuttonsuccess"
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SuccessPage;
