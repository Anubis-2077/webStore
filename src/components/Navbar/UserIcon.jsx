
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import LoginIcon from '@mui/icons-material/Login';
import UserMenu from "./UserMenu";

const UserIcon = () => {
  const { authData } = useAuth();


  return (
    <div className="userIconContainer">
      
      
        <ul className="ulUser">
         
          {authData.token ? (
            // Usuario logueado
            <>
              <li className="">
                <UserMenu />
              </li>

              {/* Puedes agregar más opciones para usuarios logueados aquí */}
            </>
          ) : (
            // Usuario no logueado
            <>
              
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <LoginIcon className="personIcon loginIcon"/>
                </Link>
              </li>
            </>
          )}
        </ul>
      
    </div>
  );
};
export default UserIcon;
