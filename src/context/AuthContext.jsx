import  { createContext, useState, useEffect  } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuthData({ token, user });
      console.log('Token y usuario encontrados en localStorage:', token, user);
    }
  }, []);

  const login = async (loginData) => {
    try {
      
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', loginData);
      const token = response.data.key; // Asumiendo que el token viene en la propiedad 'key'
      const username = loginData.username
      setAuthData({
        ...authData,
        token: token,
        user: loginData.username, // Esto es un ejemplo, ajusta según tu caso
      });
      localStorage.setItem('token', token); 
      console.log('Login exitoso');
      localStorage.setItem('user', username)
      console.log('este es el username desde authcontext: ',username)
    } catch (error) {
      console.error('Error en el login:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Limpia el token de localStorage
    setAuthData({ token: null, user: null }); // Resetea el estado de autenticación
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };