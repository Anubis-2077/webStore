
import "./styles/ProductPages.css";
import { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import EditProductButton from "../components/Product/EditProductButton";
import DeleteProductButton from "../components/Product/DeleteButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const [filterInput, setFilterInput] = useState("");

  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/product/get/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Aquí transformas los datos para incluir los botones de "Editar" y "Eliminar"
        const transformedData = response.data.map((prod) => ({
          ...prod,
          imagen: `http://127.0.0.1:8000${prod.imagen}`,
          editar: <EditProductButton to={`/product/update/${prod.id}/`} />,
          eliminar: (
            <DeleteProductButton
              id={prod.id}
              token={token}
              onSuccess={loadProducts}
            />
          ),
        }));
        console.log("esta es la transformed:", transformedData);

        setProductos(transformedData);
      } catch (error) {
        console.error("error al cargar los productos", error);
        Swal.fire("Error", "Hubo un error al cargar los productos", "error");
      }
    };

    loadProducts();
  }, [token]);

  const ImageCell = ({ value }) => {
    return (
      <img src={value} alt="Imagen del producto" style={{ width: "100px" }} />
    );
  };

  ImageCell.propTypes = {
    value: PropTypes.string.isRequired,
  };

  // Definiciones de las columnas de tu tabla
  const columns = [
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Imagen",
      accessor: "imagen",
      Cell: ({ value }) => <ImageCell value={value} />,
    },
    {
      Header: "Precio",
      accessor: "precio",
      Cell: ({ value }) => `$ ${value}`,
    },
    {
      Header: "Stock disponible",
      accessor: "cantidad",
    },
    {
      Header: "Vendidos",
      accessor: "vendidos",
    },
    {
      Header: "Editar",
      accessor: "editar",
    },
    {
      Header: "Eliminar",
      accessor: "eliminar",
    },
  ];

  const data = useMemo(() => productos, [productos]);

  // UseMemo para no recalcular los datos en cada render
  const dataMemo = useMemo(() => data, [data]);
  const columnsMemo = useMemo(() => columns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    { columns: columnsMemo, data: dataMemo, initialState: { pageSize: 10 } },
    useGlobalFilter,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  

  useEffect(() => {
    const handleResize = () => {
      setShowNavbar(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showArrowBack, setShowArrowBack] = useState(window.innerWidth <= 500);

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(-1)
  }
  return (
    <>
      <div className="mainContainerProductPage">
       
        {showArrowBack && <ArrowBackIcon className="ArrowBackProductList" onClick={handleNavigate} />  }
        <div className="cuerpo">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">Lista de productos publicados</h3>
            </div>

            <div className="card-body">
              <>
                <input
                  value={filterInput}
                  onChange={handleFilterChange}
                  placeholder={"Buscar producto"}
                  className="form-control"
                  style={{ margin: "20px 0" }}
                />
                <table {...getTableProps()} className="table">
                  <thead>
                    {headerGroups.map((headerGroup, index) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={`header-group-${index}`}
                      >
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()} key={column.id}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                          {row.cells.map((cell, cellIndex) => {
                            // Usando tanto rowIndex como cellIndex garantiza una key única para cada celda
                            return (
                              <td
                                {...cell.getCellProps()}
                                key={`cell-${rowIndex}-${cellIndex}`}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="text-center">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn btn-outline-info"
                    style={{ marginRight: "2rem" }}
                  >
                    {"Anterior"}
                  </button>
                  <span>
                    Página {pageIndex + 1} de {pageOptions.length}
                  </span>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn btn-outline-info"
                    style={{ marginLeft: "2rem" }}
                  >
                    {"Siguiente"}
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
