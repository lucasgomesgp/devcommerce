import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getIsLogged } from "../storage";

type UserProps = {
    children: ReactNode;
};

type UserProviderProps = {
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
};
export const UserContext = createContext({} as UserProviderProps);

export function UserProvider({ children }: UserProps) {
    const [isLogged, setIsLogged] = useState(false);

    const userStorage = useMemo(
        () => ({ isLogged, setIsLogged }),
        [isLogged, setIsLogged]
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

export function useAuth() {
    const { isLogged, setIsLogged } = useContext(UserContext);
    return { isLogged, setIsLogged };
}
