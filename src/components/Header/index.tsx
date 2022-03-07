import { MutableRefObject, useContext, useRef, useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../../assets/logoName.svg";
import shoppingCartImg from "../../assets/shopping_cart.svg";
import { useAuth } from "../../hooks/Auth";
import { useShop } from "../../hooks/useShop";
import { clear } from "../../storage";
import styles from "./styles.module.scss";

export function Header() {
    const navigate = useNavigate();
    const { items } = useShop();
    const [status, setStatus] = useState(true);
    const { handleLogout } = useAuth();
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

    return (
        <>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.nav}
                    data-testid="homebtn"
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
                        data-testid="shop"
                        data-cy="shop"
                    >
                        {items?.length ? (
                            <div
                                className={styles.itemCount}
                                data-testid="item-count"
                            >
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
                        data-testid="logout"
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
                    data-testid="hamburger"
                >
                    <span className={styles.hamburger_menu} />
                </button>
            </header>
            <ul
                className={styles.hamburger}
                ref={menuAreaRef}
                aria-hidden={status}
            >
                <li className={styles.item}>
                    <Link to="/home" data-testid="home_hamburger">
                        Início
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link to="/shop" data-testid="shop_hamburger">
                        Carrinho
                    </Link>
                </li>
                <li className={styles.item}>
                    <button
                        type="button"
                        onClick={handleLogout}
                        data-testid="logout_hamburger"
                    >
                        Sair
                    </button>
                </li>
            </ul>
        </>
    );
}
