import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ShoppinCart } from "./pages/ShoppingCart";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<ShoppinCart />} />
        </Routes>
    );
}

export default App;
