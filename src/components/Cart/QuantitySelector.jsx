import { useState } from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';
import PropTypes from "prop-types";

const QuantitySelector = ({ cantidad, onQuantityChange }) => {
  const [count, setCount] = useState(cantidad);

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount, 'increase');  
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount, 'decrease');  
    }
  };

  return (
    <HStack maxW="180px" className='inputCountContainer'>
      <Button onClick={handleDecrease} disabled={count === 1} className='inputButton'>−</Button>
      <Input readOnly value={count} textAlign="center" className='inputCount'/>
      <Button onClick={handleIncrease} className='inputButton'>+</Button>
    </HStack>
  );
};

export default QuantitySelector;

QuantitySelector.propTypes = {
    cantidad: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired
};