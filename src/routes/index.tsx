import { Route, Routes as Wrapper } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { ShoppingCart } from "../pages/ShoppingCart";
import { ShoppingCartInfos } from "../pages/ShoppingCartInfos";
import { CreditCard } from "../pages/CreditCard";
import { Sale } from "../pages/Sale";
import { PrivateRoute } from "../components/PrivateRoute";

export function Routes() {
    return (
        <Wrapper>
            <Route path="/" element={<Login />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/shop"
                element={
                    <PrivateRoute>
                        <ShoppingCart />
                    </PrivateRoute>
                }
            />
            <Route
                path="/info"
                element={
                    <PrivateRoute>
                        <ShoppingCartInfos />
                    </PrivateRoute>
                }
            />
            <Route
                path="/card"
                element={
                    <PrivateRoute>
                        <CreditCard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/sale"
                element={
                    <PrivateRoute>
                        <Sale />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Wrapper>
    );
}
