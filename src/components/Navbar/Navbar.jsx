import "./styles/NavbarStyles.css";
import Logo from "./Logo";

import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";
import PropTypes from 'prop-types';

const Navbar = ({setSearchTerm}) => {
  
  return (
    <div className="navbarContainer">
      <Logo />
      

      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="iconsContainer">
        <UserIcon />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes={
  setSearchTerm: PropTypes.func.isRequired
}
