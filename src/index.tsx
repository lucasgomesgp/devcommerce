import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { ShopProvider } from "./hooks/useShop";
import { UserProvider } from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <ShopProvider>
                <BrowserRouter>
                    <App />
                    <ToastContainer position="top-right" autoClose={1500} />
                </BrowserRouter>
            </ShopProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
