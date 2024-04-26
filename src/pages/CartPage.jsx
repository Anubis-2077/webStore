import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/CartPage.css";
import { Container, Box, Flex } from "@chakra-ui/react";
import CartPageCard from "../components/Cart/CartPageCard";
import CartResume from "../components/Cart/CartResume";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {  useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCartDetails = async () => {
    try {
      const cartId = localStorage.getItem("cartId");
      if (cartId) {
        const response = await axios.get(
          `http://127.0.0.1:8000/carts/${cartId}/get_cart/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setCartProduct(response.data.cart_items); // Suponiendo que esta es la estructura de datos
      }
    } catch (error) {
      console.error("Error al cargar detalles del carrito:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [token]);

  /* actualizar cantidades */

  const updateQuantity = async (item_id, newQuantity, action) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/carts/update_quantity/${action}/`, // Agregar la acción a la URL
        {
          item_id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(
        "Acción:",
        action,
        "Nueva cantidad:",
        newQuantity,
        "Item ID:",
        item_id
      );

      if (response.status === 200) {
        fetchCartDetails();
      } else {
        console.error(
          "accion: ",
          action,
          "Nueva cantidad:",
          newQuantity,
          "Item ID:",
          item_id
        );
        console.error("Error al actualizar la cantidad:", response);
        Swal.fire("Error", "No se pudo actualizar la cantidad", "error");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud de actualización:", error);
      console.error(
        "accion: ",
        action,
        "Nueva cantidad:",
        newQuantity,
        "Item ID:",
        item_id
      );
      Swal.fire("Error", toString(error), "error");
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (cartProduct.length > 0) {
      const total = cartProduct.reduce((acc, item) => {
        return acc + item.cantidad * item.producto.precio;
      }, 0);
      setTotalPrice(total);
      setTotalItems(cartProduct.length); // Cuenta el total de ítems únicos
    }
  }, [cartProduct]);

  

  

  const [showCartTitleContainer, setShowCartTitleContainer]=useState(window.innerWidth <=500);

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(-1)
  }

  return (
    <div>
      

      <Container
        maxW="container.xl"
        p={0}
        style={{ paddingTop: "8%" }}
        id="mainContainerCartPage"
      >
        { showCartTitleContainer && <div className="cartTitleContainer">
          
          <button onClick={() => navigate(-1)}>
          
          </button>
        
        <span className="cartTitle">Mi Carrito</span>
        <div className="placeholder"></div>
      </div>}
        

        <Flex direction="row" className="containerCardComponent">
          <Box
            flex="2"
            bg="gray.100"
            overflowY="auto"
            className="cardContainer"
          >
            {cartProduct.map((item) => (
              <CartPageCard
                className="cartPageCard"
                imagen={item.producto.imagen}
                key={item.producto.id}
                nombre={item.producto.nombre}
                precio={item.producto.precio}
                cantidad={item.cantidad}
                updateQuantity={updateQuantity}
                item_id={item.id}
              />
            ))}
          </Box>
          <Box
            flex="1"
            bg="white"
            p={4}
            height="fit-content"
            className="resumeContainer"
          >
            <CartResume totalItems={totalItems} totalPrice={totalPrice} />
          </Box>
        </Flex>
      </Container>
    </div>
  );
};
export default CartPage;
