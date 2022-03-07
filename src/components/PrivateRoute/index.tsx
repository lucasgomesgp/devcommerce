/* eslint-disable prettier/prettier */

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getIsLogged } from "../../storage";


export function PrivateRoute({ children }: { children: JSX.Element }) {
    const statusLogin = getIsLogged("user") !== null;
    return statusLogin ? children : (
        <>
            <Navigate to="/" />
            {
                toast.warning("Para acessar essa rota é necessário fazer login primeiro!", {
                    toastId: Math.floor(Math.random() * 10),
                })
            }
        </>
    );
}
