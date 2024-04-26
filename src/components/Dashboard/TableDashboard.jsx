import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  Flex,
  Heading
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TableDashboard = () => {
  const token = localStorage.getItem("token");
  const [envios, setEnvios] = useState('')
  
  
  
  useEffect(() => {
    const actualizarEnvios = async () => {
      try {
        // Nota: el segundo argumento de axios.get debe ser un objeto de configuración
        const response = await axios.get('http://127.0.0.1:8000/api/envios/', {
          headers: { Authorization: `Token ${token}` }
        });
        console.log('response envios: ', response.data);
         setEnvios(response.data);
      } catch (error) {
        console.error('Error al obtener los envíos:', error);
      }
    };

    actualizarEnvios(); // Ejecutar la función para actualizar envíos
  }, [token]);




  return (
    <div className="contenedorTablaExterior">
      <TableContainer w="100%">
      <Heading className="headingSendTable">Envios Pendientes</Heading>
        <Table variant="simple" className="contenedorTablaInterior">
          
          <Thead>
            <Tr >
              <Th textAlign="center">Cliente</Th>
              <Th textAlign="center">Estado</Th>
              <Th textAlign="center">Productos</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody className="TableContainer">
        {Array.isArray(envios) && envios.map((envio) => (
          <Tr key={envio.id} className="TrContainer">
            <Td textAlign="center" className="TdContainer">{envio.cliente?.nombre} {envio.cliente?.apellido}</Td>
            <Td textAlign="center" className="TdContainer">{envio.estado}</Td>
            <Td textAlign="center"className="TdContainer">
              {Array.isArray(envio.carrito?.cart_items) && envio.carrito.cart_items.map((item) => (
                <p key={item.id}>{item.producto?.nombre} - {item.cantidad} u.</p>
              ))}
            </Td>
            <Td textAlign="center">
              <Flex justifyContent="space-around">
                <ButtonGroup variant="outline" spacing="6">

                  <Button colorScheme="blue" className="btn btn-outline-info"><Link to={`/detalle_envio/${envio.id}`}>+ Detalles</Link></Button>
                </ButtonGroup>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableDashboard;
