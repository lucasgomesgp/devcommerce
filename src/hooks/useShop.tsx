import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { Item } from "../pages/Home/Home.types";

type ContextProps = {
    children: ReactNode;
};

type ShopTypes = {
    items: Item[];
    setItems: Dispatch<SetStateAction<Item[]>>;
};
export const ShopContext = createContext({} as ShopTypes);

export function ShopProvider({ children }: ContextProps) {
    const [items, setItems] = useState<Item[]>([]);
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ShopContext.Provider value={{ items, setItems }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const { items, setItems } = useContext(ShopContext);
    return { items, setItems };
}
