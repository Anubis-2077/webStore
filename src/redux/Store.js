import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer from './CartSlice';

// Configuración de Redux Persist
const persistConfig = {
  key: 'root', // Clave para el almacenamiento local
  storage, // Indica que se usará localStorage
};

// Combinar todos los reducers. Si solo tienes cartReducer, eso está bien.
// Añade más reducers si los tienes.
const rootReducer = combineReducers({
  cart: cartReducer,
  // Otros reducers van aquí
});

// Envolver el rootReducer con persistReducer, pasándole la configuración y el rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crear el store con el reducer persistido
export const store = configureStore({
  reducer: persistedReducer, // Usa el reducer persistido aquí
  // Middleware y otros ajustes pueden ir aquí
});

// Crear el persistor, que es lo que usaremos con PersistGate
export const persistor = persistStore(store);