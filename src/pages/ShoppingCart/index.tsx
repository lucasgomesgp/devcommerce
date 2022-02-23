/* eslint-disable array-callback-return */
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { useShop } from "../../hooks/useShop";
import emptyImg from "../../assets/empty.svg";
import styles from "./styles.module.scss";

export function ShoppinCart() {
    const navigate = useNavigate();
    const { items, setItems } = useShop();
    let total = 0;
    function handleRemove(id: number) {
        const newItems = items.filter((item) => item.id !== id);
        localStorage.setItem("PRODUCTS", JSON.stringify(newItems));
        setItems(newItems);
    }
    return (
        <>
            <Header />
            <main className={styles.shopItems}>
                {items.length >= 1 ? (
                    items.map((item) => {
                        total += item.to * item.quant;
                        return (
                            <section
                                className={styles.item}
                                key={`${item.id}.${Math.random() * 100}`}
                            >
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemImg}>
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            className={styles.img}
                                        />
                                    </div>
                                    <div className={styles.infos}>
                                        <h4 className={styles.text}>
                                            {item.name}
                                        </h4>
                                        <h4
                                            className={styles.text}
                                            style={{ color: "green" }}
                                        >
                                            {Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(item.to)}
                                        </h4>
                                        <button
                                            type="button"
                                            className={styles.remove}
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <>
                        <h2>Vazio</h2>
                        <img
                            src={emptyImg}
                            alt="Carrinho vazio"
                            className={styles.emptyImg}
                        />
                    </>
                )}
                <h3 className={styles.total}>Total: R${total}</h3>
                <div className={styles.btns}>
                    <button
                        onClick={() => navigate("/home")}
                        className={styles.btn}
                        style={{ backgroundColor: "red" }}
                        type="button"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => navigate("/home")}
                        className={styles.btn}
                        style={{ backgroundColor: "green" }}
                        type="button"
                    >
                        Finalizar
                    </button>
                </div>
            </main>
        </>
    );
}
