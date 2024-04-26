import PropTypes from "prop-types";
import { Card, CardBody, CardFooter, Heading, Text, Stack, Image } from '@chakra-ui/react';
import QuantitySelector from "./QuantitySelector";
import { Link } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from "react";

const CartPageCard = ({ nombre, cantidad, precio, imagen, updateQuantity, item_id }) => {
  const precioTotal = (cantidad * precio).toFixed(2);
  const imagenUrl = `http://127.0.0.1:8000/${imagen}`;

  const [showFooter, setShowFooter] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setShowFooter(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" className="cardContainerComponent">
      <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={imagenUrl} alt={nombre} className="cardImageCart"/>
      <Stack>
        <CardBody>
          <Heading size="md" style={{ color: 'black' }} className="nombreProducto">{nombre}</Heading>
          <Text py="3" className="linkContainer">
            <Link className="link">Eliminar</Link>
            <Link className="link">Comprar ahora</Link>
            
          </Text>
          <div className="cardBottomContainer">
          <div className="priceContainer">
            <AttachMoneyIcon className="AttachMoneyIcon" /> <span className="precio">{precio}</span> 
          </div>
          <div className="selectorContainer">
          <QuantitySelector
              cantidad={cantidad}
              onQuantityChange={(newQuantity, action) => updateQuantity(item_id, newQuantity, action)}
            />
          </div>
          </div>
          
        </CardBody>

        {showFooter && <CardFooter>
          <span className="precio">$ {precioTotal}</span>
        </CardFooter>}
        
      </Stack>
    </Card>
  );
};

CartPageCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  cantidad: PropTypes.number.isRequired,
  precio: PropTypes.number.isRequired,
  imagen: PropTypes.string.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  item_id: PropTypes.number.isRequired,
};

export default CartPageCard;

