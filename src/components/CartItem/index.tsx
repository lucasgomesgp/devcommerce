import { toast } from "react-toastify";
import { useState } from "react";
import styles from "./styles.module.scss";
import addCartImg from "../../assets/addCart.svg";
import { Item } from "../../pages/Home/Home.types";
import { useShop } from "../../hooks/useShop";
import { setItem } from "../../storage";

export function CartItem({ id, from, to, src, name }: Item) {
    const { items, setItems } = useShop();
    const [quantCount, setQuantCount] = useState(1);

    function handleSendItem() {
        const newItem = { id, from, to, src, name, quant: quantCount };
        const findEqualItemInArray = items.filter((item) => item.id === id);
        if (items.length === 0) {
            setItem("PRODUCTS", [newItem]);
            setItems([newItem]);
        }
        if (items.length > 0 && findEqualItemInArray) {
            setQuantCount(quantCount + 1);
            const newArray = items.filter((item) => item.id !== id);
            setItem("PRODUCTS", [
                ...newArray,
                { ...newItem, quant: quantCount },
            ]);
            setItems([...newArray, { ...newItem, quant: quantCount }]);
        }
        if (items.length > 0 && !findEqualItemInArray) {
            setItem("PRODUCTS", [...items, newItem]);
            setItems([...items, newItem]);
        }
        toast.success(`${name} adicionado ao carrinho!`);
    }
    return (
        <div className={styles.item}>
            <div className={styles.infos}>
                <img src={src} alt={name} />
                <p>{name}</p>
            </div>
            <div className={styles.infosItem}>
                <p className={styles.from}>
                    R$
                    {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(from)}
                </p>
                <p className={styles.to}>
                    R$
                    {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(to)}
                </p>
            </div>
            <button
                type="button"
                className={styles.btnCart}
                onClick={handleSendItem}
            >
                <img src={addCartImg} alt="Adicionar ao carrinho" />
                <span>Adicionar ao carrinho</span>
            </button>
        </div>
    );
}
