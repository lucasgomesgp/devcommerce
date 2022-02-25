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
                <a
                    href="/shop"
                    className={`${activeCart ? styles.active : ""}`}
                >
                    Carrinho
                </a>
            </li>
            <li className={styles.item}>
                <a
                    href="/info"
                    className={`${activeInfo ? styles.active : ""}`}
                >
                    Entrega
                </a>
            </li>
            <li className={styles.item}>
                <a
                    href="/card"
                    className={`${activeFinish ? styles.active : ""}`}
                >
                    Finalização
                </a>
            </li>
        </ul>
    );
}
