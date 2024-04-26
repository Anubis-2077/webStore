import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import CartAsideTable from "./CartAsideTable";
import PropTypes from "prop-types";
import './styles/CartAside.css'



const CartAside = ({isOpen, onClose, cartProduct  }) => {
  const cartId = localStorage.getItem('cartId');

  const handleGoToCart = () => {
    window.location.href = `/cart/${cartId}`; // Modifica según tu enrutador o método de navegación
  };
  

  if (!isOpen) {
    return null;
}




  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl" >
      <DrawerOverlay />
      <DrawerContent class="mainDrawer">
        <DrawerCloseButton onClick={onClose} className="draweCloseButton"/>

        <DrawerBody >
          <Card className="drawerBody">
            <CardHeader className="headingContainer">
              <Heading size="md" mt="1rem" color="green" className="headingText">
                Agregaste al carrito{" "}
                <h2 style={{ color: "black" }}></h2>
              </Heading>
            </CardHeader>
            <CardBody>
              <CartAsideTable cartProduct={cartProduct}/>
            </CardBody>
          </Card>
        </DrawerBody>
        <DrawerFooter mb="-1rem" className="cartAsideFooter">
          <Button variant="outline" colorScheme="red" mr={3} onClick={onClose} className="cartAsideButton">
            Cerrar
          </Button>
          
          <Button colorScheme="blue" onClick={handleGoToCart} className="cartAsideButton">Ir al carrito</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
CartAside.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired,
    cartProduct: PropTypes.array,
  };
export default CartAside;

