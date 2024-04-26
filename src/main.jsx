import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/Store";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CartProvider } from "./context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <CartProvider>
                  <App />
                </CartProvider>
              </PersistGate>
            </Provider>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
);
