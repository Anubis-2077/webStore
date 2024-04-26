import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import PropTypes from "prop-types";
  
  // Componente reutilizable para campos de formulario
  const CustomInput = ({ id, type, label, isError, helperText, errorText, isRequired, value, onChange, name }) => {
    return (
      <FormControl isInvalid={isError} isRequired={isRequired}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input id={id} type={type} value={value} onChange={onChange} name={name} />
        {!isError ? (
          helperText && <FormHelperText>{helperText}</FormHelperText>
        ) : (
          <FormErrorMessage>{errorText}</FormErrorMessage>
        )}
        
      </FormControl>
    );
  };
  export default CustomInput
    

  CustomInput.propTypes ={
    type : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    isError: PropTypes.string.isRequired,
    helperText:PropTypes.string.isRequired,
    errorText:PropTypes.string.isRequired,
    isRequired:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired

  }

