import { MutableRefObject, useRef, useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../../assets/logoName.svg";
import shoppingCartImg from "../../assets/shopping_cart.svg";
import { useAuth } from "../../hooks/useAuth";
import { useShop } from "../../hooks/useShop";
import { clear } from "../../storage";
import styles from "./styles.module.scss";

export function Header() {
    const navigate = useNavigate();
    const { items } = useShop();
    const [status, setStatus] = useState(true);
    const { setIsLogged } = useAuth();
    const menuAreaRef = useRef() as MutableRefObject<HTMLUListElement>;

    function handleToggle() {
        if (status && menuAreaRef.current) {
            menuAreaRef.current.style.display = "initial";
            menuAreaRef.current.style.height = "42vh";
        } else {
            menuAreaRef.current.style.height = "0";
            menuAreaRef.current.style.display = "none";
        }
        setStatus(!status);
    }

    function handleLogout() {
        clear();
        setIsLogged(false);
        toast.success("Logout com sucesso!");
        navigate("/");
    }
    return (
        <>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.nav}
                    onClick={() => {
                        navigate("/home");
                    }}
                >
                    <img src={logoImg} alt="Logo DevCommerce" />
                </button>
                <div className={styles.menu}>
                    <button
                        type="button"
                        onClick={() => navigate("/shop")}
                        className={styles.shop}
                    >
                        {items.length ? (
                            <div className={styles.itemCount}>
                                {items.length}
                            </div>
                        ) : (
                            ""
                        )}
                        <img src={shoppingCartImg} alt="Shopping Cart" />
                    </button>
                    <button
                        type="button"
                        className={styles.logoutBtn}
                        onClick={handleLogout}
                    >
                        <MdExitToApp
                            className={styles.logout}
                            size={30}
                            color="red"
                        />
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleToggle}
                    className={styles.btnMenu}
                >
                    <span className={styles.hamburger_menu} />
                </button>
            </header>
            <ul className={styles.hamburger} ref={menuAreaRef}>
                <li className={styles.item}>
                    <a href="/home">Início</a>
                </li>
                <li className={styles.item}>
                    <a href="/shop">Carrinho</a>
                </li>
                <li className={styles.item}>
                    <button type="button" onClick={handleLogout}>
                        Sair
                    </button>
                </li>
            </ul>
        </>
    );
}
