import Navbar from "../components/Navbar/Navbar";
import "./styles/NewProductPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import CartAside from "../components/Cart/CartAside";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

const NewProductPage = () => {
  //variables
  const token = localStorage.getItem("token");
  const [producto, setProducto] = useState([]);
  const { id } = useParams();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const toggleAside = () => setIsAsideOpen(!isAsideOpen);
  const closeAside = () => setIsAsideOpen(false);
  const [cartId, setCartId] = useState("");

  /* cargar productos */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/product/info/${id}/`,
          {
            
          }
        );

        setProducto(response.data);
      } catch (error) {
        //console.error("Hubo un error al cargar los productos: ", error);
        Swal.fire("Error", "Hubo un error al cargar los productos", "error");
      }
    };
    loadProduct();
  }, [token]);

  const nombreProducto =
    producto && producto.nombre ? producto.nombre.length : 0;

  const getFontSize = (nombreProducto) => {
    return nombreProducto > 15 ? "5rem" : "6rem";
  };

  const fontSize = getFontSize(nombreProducto);
  const imagenUrl = `http://127.0.0.1:8000${producto.imagen}`;

  /* agregar producto al carrito */
  const productoId = producto.id;
  const addToCartButton = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/carts/create_or_get_cart/`,
        {
          producto_id: productoId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCartId(response.data.id);
      localStorage.setItem("cartId", response.data.id);
    } catch (error) {
      Swal.fire("Error", toString(error), "error");
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCartButton();
    toggleAside();
    console.log(toggleAside)
  };

  

  

  const cartIdLocal = localStorage.getItem("cartId");

  
  const handleGoToCart = () => {
    window.location.href = `/cart/${cartIdLocal}`;
  };

  return (
    <div className="newProductContainer">
      
      <div className="navIconContainer">
        <Link to="/">
          <button>
            <ArrowBackIcon className="ArrowBackIcon" />
          </button>
        </Link>

        <button onClick={handleGoToCart}>
          <ShoppingCartIcon className="ShoppingCartIcon" />
        </button>
      </div>

      <div className="">
        <div className="bottleContainer">
          <img src={imagenUrl} alt="Botella de Vino" />
        </div>
        <div className="textContainer">
          <h2 className="bodegaName">Casimiro</h2>
          <h2 className="varietal" style={{ fontSize: fontSize }}>
            {producto.nombre}
          </h2>
          <div className="medalContainer">
            <img src="/images/goldMedal.png" alt="" />
            <p className="medalText">97 pts medalla de oro</p>
          </div>
          <div className="featuresContainer">
            <span className="featuresTitle">Temperatura de servicio</span>
            <p className="featureText">65°</p>
            <span className="featuresTitle">Uvas</span>
            <p className="featureText">Malbec, Syrah</p>
            <span className="featuresTitle">Ideal para</span>
            <p className="featureText">Pescado, Carnes, Postres</p>
          </div>
          <p className="description">{producto.descripcion}</p>
        </div>
        <div className="priceBuyContainer">
          <p className="price">
            <AttachMoneyIcon className="AttachMoneyIcon" /> {producto.precio}
          </p>
          <button className="buyButton" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
        <CartAside isOpen={isAsideOpen} onClose={closeAside} />
      </div>
    </div>
  );
};
export default NewProductPage;
