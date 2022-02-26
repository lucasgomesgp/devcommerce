import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";

type User = {
    email: string;
    password: string;
};

type UserProps = {
    children: ReactNode;
};

type UserProviderProps = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
};
export const UserContext = createContext({} as UserProviderProps);

export function UserProvider({ children }: UserProps) {
    const [user, setUser] = useState<User>({} as User);
    const [isLogged, setIsLogged] = useState(false);

    const userStorage = useMemo(
        () => ({ user, setUser, isLogged, setIsLogged }),
        [user, setUser, isLogged, setIsLogged]
    );

    return (
        <UserContext.Provider value={userStorage}>
            {children}
        </UserContext.Provider>
    );
}

export function useAuth() {
    const { user, setUser, isLogged, setIsLogged } = useContext(UserContext);
    return { user, setUser, isLogged, setIsLogged };
}
