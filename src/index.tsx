import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";
import { ShopProvider } from "./hooks/useShop";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ShopProvider>
                <App />
                <ToastContainer position="top-right" autoClose={1500} />
            </ShopProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
