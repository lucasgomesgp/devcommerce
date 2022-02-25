/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logoName.svg";
import shoppingCartImg from "../../assets/shopping_cart.svg";
import { useShop } from "../../hooks/useShop";
import styles from "./styles.module.scss";

export function Header() {
    const navigate = useNavigate();
    const { items } = useShop();
    return (
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
        </header>
    );
}
