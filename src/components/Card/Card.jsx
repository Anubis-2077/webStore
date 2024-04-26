import "./styles/Card.css";
import useCart  from "../../context/UseCart";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ content, producto, precio, imageUrl, medal, year, points, id }) => {
  const { addToCart } = useCart();
  const productDetails = {
    producto,
    precio,
    imageUrl,
    content,
    medal,
    year,
    points,
    id
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickEvent = () => {
    addToCart(productDetails);
  };

  const cardStyle = {
    backgroundColor: isHovered ? ' #f3c57c' : ''
    
  }

  const yearValue = 2009

  return (
    <Link style={{textDecoration: 'none'}} to={`/product/${id}`}>
    <div className="productCard" onClick={handleClickEvent}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={cardStyle}>
      {medal && <img src={medal} alt="Medal" className="medal-logo" />}
      <img src={imageUrl} alt={producto} className="productImage" />
      <div className="productYear">{yearValue}2009</div>
      <h3 className="productName">{producto}</h3>
      <div className="productPrice">$ {precio}</div>
      <div className="productPoints">{points} 97 Points</div>
    </div>
    </Link>
    
  );
};

Card.propTypes = {
  content: PropTypes.node.isRequired,
  producto: PropTypes.string.isRequired,
  precio: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  medal: PropTypes.string,
  year: PropTypes.string,
  points: PropTypes.string,
  id: PropTypes.number.isRequired
};

export default Card;
