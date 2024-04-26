import './CardContainer.css';
import Card from '../Card/Card';
import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';

const CardContainer = ({ searchTerm }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const productosPorPagina = 12;
  
  // Cargar productos una sola vez
  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get("http://127.0.0.1:8000/product/get/");
              setProductos(response.data);
              setTotalItems(response.data.length); // Set total items here based on initial load
          } catch (error) {
              console.error("Error al cargar los productos: ", error);
              Swal.fire("Error", "Hubo un error al cargar los productos", "error");
          }
      };
      fetchProducts();
  }, []);

  // Filtrar productos cada vez que cambia searchTerm
  useEffect(() => {
      const filteredProducts = searchTerm
          ? productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
          : productos;
      setProductosFiltrados(filteredProducts);
      setTotalItems(filteredProducts.length); // Update total items based on filtered products
  }, [searchTerm, productos]);

  const indiceDelUltimoProducto = paginaActual * productosPorPagina;
  const indiceDelPrimerProducto = indiceDelUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indiceDelPrimerProducto, indiceDelUltimoProducto);

  const handleChange = (event, value) => setPaginaActual(value);

  return (
      <div className='mainCardContainer'>
          <div className="CardContainer">
              {productosActuales.length > 0 ? (
                  productosActuales.map((producto) => (
                      <Card key={producto.id} id={producto.id} producto={producto.nombre} precio={producto.precio.toString()} imageUrl={`http://127.0.0.1:8000${producto.imagen}`} content={<p>Descripción del producto: {producto.descripcion}</p>} />
                  ))
              ) : (
                  <div className="sin-resultados">
                      
                      <h3>No se encontraron productos.</h3>
                  </div>
              )}
          </div>
          <div className="paginationContainer">
              <Pagination count={Math.ceil(totalItems / productosPorPagina)} page={paginaActual} onChange={handleChange} className='PaginatorIndex' size="large" showFirstButton showLastButton/>
          </div>
      </div>
  );
};

CardContainer.propTypes = {
  searchTerm: PropTypes.string.isRequired
};

export default CardContainer;