import { Box,Text } from '@chakra-ui/react'

import { Link } from "react-router-dom"
import PropTypes from "prop-types";

const BoxDashboard = ({numberValue, name, background})=>{
    return(
        <Box
      p={4}
      bg={background}
      color='white'
      rounded='md'
      shadow='md'
      textAlign='center'
      position='relative'
      _hover={{ bg: 'teal.600' }}
      
      className='boxDashboard'
    >
      <Text fontSize='6xl' fontWeight='bold'>
        {numberValue}
      </Text>
      <Text fontSize='lg' fontWeight='semibold'>
        {name}
      </Text>
      

      <Link
        href='#'
        position='absolute'
        bottom='2'
        right='2'
        fontWeight='semibold'
        fontSize='sm'
        color='teal.200'
        _hover={{
          color: 'white',
          textDecoration: 'underline',
        }}
      >
      </Link>
    </Box>
    )
}

export default BoxDashboard

BoxDashboard.propTypes = {
  numberValue : PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  background: PropTypes.string.isre
};