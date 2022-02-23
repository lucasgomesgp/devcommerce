import { toast } from "react-toastify";
import { useState } from "react";
import styles from "./styles.module.scss";
import addCartImg from "../../assets/addCart.svg";
import { Item } from "../../pages/Home/Home.types";
import { useShop } from "../../hooks/useShop";

export function CartItem({ id, from, to, src, name, quant }: Item) {
    const { items, setItems } = useShop();
    const [isAdded, setIsAdded] = useState(false);
    async function handleSendItem() {
        const newItem = { id, from, to, src, name, quant };
        if (items.length === 0) {
            localStorage.setItem("PRODUCTS", JSON.stringify([newItem]));
            setItems([newItem]);
            setIsAdded(true);
        } else {
            setItems([...items, newItem]);
            const item = [...items, newItem];
            localStorage.setItem("PRODUCTS", JSON.stringify(item));
            setIsAdded(true);
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
                disabled={isAdded}
            >
                <img src={addCartImg} alt="Adicionar ao carrinho" />
                <span>Adicionar ao carrinho</span>
            </button>
        </div>
    );
}
