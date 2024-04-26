import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Asegúrate de que la ruta de importación sea correcta

export const useAuth = () => useContext(AuthContext);
