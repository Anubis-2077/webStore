import axios from "axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const DeleteCategoryButton = ({ id, token, onSuccess }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: "¿Desea eliminar la categoría?",
      text: "Esta acción no se puede deshacer.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Solo proceder con la eliminación si el usuario confirma
        axios
          .delete(`http://127.0.0.1:8000/category/update/${id}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then(() => {
            Swal.fire(
              "Eliminado",
              "La categoría ha sido eliminado con éxito.",
              "success"
            );
            onSuccess(); // Llama a onSuccess si se necesita realizar alguna acción después de la eliminación
          })
          .catch((error) => {
            console.error("Error al eliminar la categoría", error);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar la categoría.",
              "error"
            );
          });
      }
    });
  };

  return (
    <button onClick={handleDelete} className="btn btn-outline-danger">
      Eliminar
    </button>
  );
};

DeleteCategoryButton.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

export default DeleteCategoryButton;
