import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';


const CartResume = ({ totalItems, totalPrice }) => {





  return (
    <Card  className="resumeContainerComponent">
      <CardHeader className="cardHeaderContainer">
        <h3 className="cardHeaderTitle">Resumen de compra</h3>
      </CardHeader>
      <Divider className="firstDivider"/>
      <CardBody className="cardBodycontainer">
        <Text fontSize="20px">
          Productos (<strong>{totalItems}</strong>)
        </Text>
        <Text color="blue.600" fontSize="2xl">
          Total compra: ${totalPrice}
        </Text>
      </CardBody>
      <Divider className="firstDivider"/>
      <CardFooter className="cardFooterResume">
        
        <Button variant="solid" colorScheme="blue" w={300} to='/success' className="successButton">
        <Link to='/success'>
          Continuar compra
        </Link>
          
        </Button>
        
        
      </CardFooter>
    </Card>
  );
};

export default CartResume;

CartResume.propTypes = {
  totalItems: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  cart_id: PropTypes.string.isRequired,
};
