import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const EditProductButton = ({to}) =>{
    return(
        <Link  to={to} className="btn btn-outline-warning">Editar</Link>
    );
};

EditProductButton.propTypes = {
    to: PropTypes.string.isRequired,
};
export default EditProductButton