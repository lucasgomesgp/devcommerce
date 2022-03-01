import { Item } from "../pages/Home/Home.types";

function getItem(item: string): Item[] {
    const product = localStorage.getItem(item);
    const result = product ? JSON.parse(product) : [];
    return result;
}

function setItem(item: string, value: Item | Item[]) {
    localStorage.setItem(item, JSON.stringify(value));
}

function setLogged(item: string, value: string) {
    localStorage.setItem(item, value);
}

function getIsLogged(item: string) {
    const result = localStorage.getItem(item);
    return result;
}

function clear() {
    localStorage.clear();
}

function removeItem(item: string) {
    localStorage.removeItem(item);
}

export { clear, getItem, removeItem, setItem, setLogged, getIsLogged };
