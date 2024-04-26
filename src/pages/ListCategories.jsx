
import "./styles/ProductPages.css";
import { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";
import Swal from "sweetalert2";
import EditProductButton from '../components/Product/EditProductButton'
import DeleteCategoryButton from "../components/Category/DeleteCategoryButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";




// Definiciones de las columnas de la tabla
const columns = [
  {
    Header: "Nombre",
    accessor: "nombre", 
  },
  {
    Header: "Descripcion",
    accessor: "descripcion",
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

const ListCategories = () => {
  const [filterInput, setFilterInput] = useState("");
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/category/get/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        const transformedData = response.data.map(cat => ({
          ...cat,
          
          editar: <EditProductButton to={`/category/update/${cat.id}/`} />, 
          eliminar: <DeleteCategoryButton id={cat.id} token={token} onSuccess={loadCategories}  />
        }));
        
        setCategories(transformedData);
      } catch (error) {
        console.error("error al cargar las categorias", error);
        Swal.fire("Error", "hubo un error al cargar las categorias", "error");
      }
    };
  
    loadCategories();
  }, [token]);

  const data = useMemo(() => categories, [categories]);

  // UseMemo para no recalcular los datos en cada render
  const dataMemo = useMemo(() => data, []);
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
    {   columns: columnsMemo,
        data: data,
        initialState: { pageSize: 10 } },
    useGlobalFilter,
    usePagination,
    
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  

  useEffect(() => {
    const handleResize = () => {
      setShowArrowBack(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showArrowBack, setShowArrowBack]=useState(window.innerWidth <=500);

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate(-1)
  }
  return (
    <div className="cuerpo mainContainerListCategories">
      
      {showArrowBack && <ArrowBackIcon className="arrowBackListCategories" onClick={handleNavigate} />}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lista de categorías vigentes</h3>
        </div>

        <div className="card-body">
          <>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder={"Buscar producto"}
              className="form-control"
              style={{'margin': '20px 0'}}
            />
            <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={`header-group-${index}`}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} 
                        key={column.id}>
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
                                <td {...cell.getCellProps()} key={`cell-${rowIndex}-${cellIndex}`} >
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
                style={{'marginRight': '2rem'}}
              >
                {"Anterior"}
              </button>
              <span>
                Página {pageIndex + 1} de {pageOptions.length}
              </span>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-outline-info" style={{'marginLeft': '2rem'}}> 
                {"Siguiente"}
              </button>
            </div>
          </>
          
        </div>
      </div>
    </div>
  );
};

export default ListCategories;


