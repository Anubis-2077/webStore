import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  //Td,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";

const CartAsideTable = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const fetchCartDetails = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/carts/${cartId}/get_cart/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setCartProduct(response.data.cart_items); // Suponiendo que esta es la estructura de datos
        } catch (error) {
          console.error("Error al cargar detalles del carrito:", error);
        }
      };
      fetchCartDetails();
    }
  }, [token]);
  const imagenUrl = `http://127.0.0.1:8000/`;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>{" "}
            {/* Asumiendo que aquí iría algo como una imagen o ícono */}
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartProduct.map((item) => (
            <tr key={item.producto.id}>
              <td className="cartTableMain">
                <img
                  src={imagenUrl + item.producto.imagen}
                  alt={item.producto.nombre}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td className="cartTableMain">{item.producto.nombre}</td>
              <td className="tdPrecio cartTableMain">${item.producto.precio}</td>
            </tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CartAsideTable;
