import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clear, getIsLogged, getItem } from "../storage";

type UserProps = {
    children: ReactNode;
};

type UserProviderProps = {
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
    handleLogout: () => void;
};
export const UserContext = createContext({} as UserProviderProps);

export function UserProvider({ children }: UserProps) {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        clear();
        toast.success("Logout com sucesso!");
        setIsLogged(false);
        navigate("/");
    }, [navigate]);
    const userStorage = useMemo(
        () => ({ isLogged, setIsLogged, handleLogout }),
        [isLogged, setIsLogged, handleLogout]
    );

    useEffect(() => {
        const storagedUser = getIsLogged("user");
        if (storagedUser) {
            setIsLogged(true);
        }
    }, []);
    return (
        <UserContext.Provider value={userStorage}>
            {children}
        </UserContext.Provider>
    );
}
