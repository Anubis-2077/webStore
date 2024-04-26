import { useAuth } from "../../context/UseAuth";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const UserMenu = () => {
  const { authData } = useAuth();
  const { logout } = useAuth();

  return (
    <li
      className="nav-item dropdown"
      style={{ marginRight: "3rem", padding: "1px" }}
    >
      <PersonIcon
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="true"
        className="personIcon"
        style={{ fontSize: "1.7rem", marginTop: "-.5rem" }}
      />

      <div className="dropdown-menu " data-bs-popper="static">
        <Link className="dropdown-item" to="/user_profile">
          {authData.user}
        </Link>

        <div
          className="dropdown-divider"
          style={{ border: "solid .1px grey" }}
        ></div>
        <Link className="dropdown-item" to="/publish_product">
          Publicar producto
        </Link>
        <Link className="dropdown-item" to="/product_list">
          Productos publicados
        </Link>
        <Link className="dropdown-item" to="/dashboard">
          Dashboard
        </Link>
        <Link className="dropdown-item" to="/create_category">
          Crear categoría
        </Link>
        <Link className="dropdown-item" to="/category_list">
          Categorias existentes
        </Link>
        <a className="dropdown-item" href="#">
          Escribir blog
        </a>
        <div
          className="dropdown-divider"
          style={{ border: "solid .1px grey" }}
        ></div>
        <button className="dropdown-item " onClick={logout} to="/">
          {" "}
          Cerrar sesión
        </button>
      </div>
    </li>
  );
};

export default UserMenu;
