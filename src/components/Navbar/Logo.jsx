import { Link } from "react-router-dom";
import './styles/NavbarStyles.css'
const Logo = ()=>{
    return(
        <div className="logoContainer">
            <Link to="/" style={{textDecoration: 'none'}}> <img src="/src/images/logo.png"  alt="Ritual del vino almacen de bebidas" /> </Link>
        </div>
    )
};
export default Logo

