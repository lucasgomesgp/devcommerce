import { Link } from "react-router-dom";
import { HeaderShopProps } from "./HeaderShop.types";
import styles from "./styles.module.scss";

export function HeaderShop({
    activeCart,
    activeInfo,
    activeFinish,
}: HeaderShopProps) {
    return (
        <ul className={styles.shopMenu}>
            <li className={styles.item}>
                <Link
                    to="/shop"
                    className={`${activeCart ? styles.active : ""}`}
                    data-testid="cart"
                >
                    Carrinho
                </Link>
            </li>
            <li className={styles.item}>
                <Link
                    to="/info"
                    className={`${activeInfo ? styles.active : ""}`}
                >
                    Entrega
                </Link>
            </li>
            <li className={styles.item}>
                <Link
                    to="/card"
                    className={`${activeFinish ? styles.active : ""}`}
                >
                    Finalização
                </Link>
            </li>
        </ul>
    );
}
