import { Route, RouteProps, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute<RouteProps>({ ...rest }: RouteProps) {
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <Navigate to="/" />;
    }

    return <Route {...rest} />;
}
