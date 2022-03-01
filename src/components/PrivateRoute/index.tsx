import { Navigate } from "react-router-dom";
import { getIsLogged } from "../../storage";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const statusLogin = getIsLogged("user") !== null;
    return statusLogin ? children : <Navigate to="/" />;
}
