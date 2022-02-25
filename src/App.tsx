import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ShoppingCartInfos } from "./pages/ShoppingCartInfos";
import { CreditCard } from "./pages/CreditCard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<ShoppingCart />} />
            <Route path="/info" element={<ShoppingCartInfos />} />
            <Route path="/card" element={<CreditCard />} />
        </Routes>
    );
}

export default App;
