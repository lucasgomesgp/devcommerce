/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logoName.svg";
import shoppingCartImg from "../../assets/shopping_cart.svg";
import { useShop } from "../../hooks/useShop";
import styles from "./styles.module.scss";

export function Header() {
    const navigate = useNavigate();
    const { items } = useShop();
    const [status, setStatus] = useState(false);
    const menuAreaRef = useRef() as MutableRefObject<HTMLUListElement>;

    function handleToggle() {
        if (status && menuAreaRef.current) {
            menuAreaRef.current.style.display = "initial";
            menuAreaRef.current.style.height = "28vh";
        } else {
            menuAreaRef.current.style.height = "0";
            menuAreaRef.current.style.display = "none";
        }
        setStatus(!status);
    }
    return (
        <>
            <header className={styles.header}>
                <nav
                    className={styles.nav}
                    onClick={() => {
                        navigate("/home");
                    }}
                >
                    <img src={logoImg} alt="Logo DevCommerce" />
                </nav>
                <button
                    type="button"
                    onClick={() => navigate("/shop")}
                    className={styles.shop}
                >
                    {items.length ? (
                        <div className={styles.itemCount}>{items.length}</div>
                    ) : (
                        ""
                    )}
                    <img src={shoppingCartImg} alt="Shopping Cart" />
                </button>
                <span
                    className={styles.hamburger_menu}
                    onClick={handleToggle}
                />
            </header>
            <ul className={styles.hamburger} ref={menuAreaRef}>
                <li className={styles.item}>
                    <a href="/home">Início</a>
                </li>
                <li className={styles.item}>
                    <a href="/shop">Carrinho</a>
                </li>
            </ul>
        </>
    );
}
