import { useContext } from "react";
import { UserContext } from "../useAuth";

export function useAuth() {
    const { isLogged, setIsLogged, handleLogout } = useContext(UserContext);
    return { isLogged, setIsLogged, handleLogout };
}
