import { Item } from "../pages/Home/Home.types";

function getItem(item: string) {
    const product = localStorage.getItem(item);
    return product;
}

function setItem(item: string, value: Item | Item[]) {
    localStorage.setItem(item, JSON.stringify(value));
}

function clear() {
    localStorage.clear();
}

export { clear, getItem, setItem };
