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
import { Item } from "../pages/Home/Home.types";
import { getItem } from "../storage";

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
    const itemStorage = useMemo(() => ({ items, setItems }), [items, setItems]);

    useEffect(() => {
        const storageItems = getItem("PRODUCTS");
        if (storageItems) {
            setItems(storageItems);
        }
    }, []);
    return (
        <ShopContext.Provider value={itemStorage}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const { items, setItems } = useContext(ShopContext);
    return { items, setItems };
}
