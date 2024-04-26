import { createContext,  useState, useEffect } from "react";
import PropTypes from "prop-types";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Cargar los elementos del carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Guardar los elementos del carrito en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  

  const addToCart = (product) => {
    console.log('producto agregado al carrito desde la funcion add to cart')
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems, product];
      console.log(updatedCartItems)
      return updatedCartItems;
      
    });
    toggleCart(); // Opcionalmente, abrir el carrito automáticamente al añadir un producto
  };

  const clearCart = () => {
    setCartItems([]);
    console.log("carrito borrado");
  };


  return (
    <CartContext.Provider
      value={{ isCartOpen, toggleCart, cartItems, addToCart, clearCart,  }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Corrección en la definición de propTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Debe ser node, no string, ya que children son los componentes envueltos
};


