import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { useShop } from "../../hooks/useShop";
import emptyImg from "../../assets/empty.svg";
import { setItem } from "../../storage";
import styles from "./styles.module.scss";

export function ShoppingCart() {
    const navigate = useNavigate();
    const { items, setItems } = useShop();
    let total = 0;

    function findItem(id: number) {
        const result = items.filter((item) => item.id !== id);
        return result;
    }

    function handleRemove(id: number) {
        const newItems = findItem(id);
        setItem("PRODUCTS", [...newItems]);
        setItems(newItems);
    }

    function handleOperation(id: number, type: "sub" | "plus") {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                if (item.quant === 1 && type === "sub") {
                    toast.error("Limite mínimo atingido!");
                    return item;
                }
                if (type === "sub") {
                    return {
                        ...item,
                        quant: item.quant ? item.quant - 1 : 1,
                    };
                }
                return {
                    ...item,
                    quant: item.quant ? item.quant + 1 : 1,
                };
            }
            return item;
        });
        setItem("PRODUCTS", updatedItems);
        setItems([...updatedItems]);
    }

    return (
        <>
            <Header />
            <main className={styles.shopItems}>
                {items.length >= 1 ? (
                    items.map((item) => {
                        total += item.to * (item.quant || 1);
                        return (
                            <section
                                className={styles.item}
                                key={`${item.id}.${Math.random() * 100}`}
                            >
                                <div
                                    className={styles.itemInfo}
                                    data-cy="items-section"
                                >
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
                                    <div className={styles.qtd} data-cy="qtd">
                                        <p className={styles.qtdText}>
                                            Quantidade
                                        </p>
                                        <button
                                            type="button"
                                            className={`${styles.btnQtd} ${styles.danger}`}
                                            data-testid="sub"
                                            onClick={() =>
                                                handleOperation(item.id, "sub")
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            disabled
                                            value={item.quant}
                                            className={styles.inptQtd}
                                        />
                                        <button
                                            type="button"
                                            className={`${styles.btnQtd} ${styles.success}`}
                                            data-testid="plus"
                                            onClick={() => {
                                                handleOperation(
                                                    item.id,
                                                    "plus"
                                                );
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <section className={styles.empty}>
                        <h2 className={styles.emptyText}>
                            Seu carrinho está vazio
                        </h2>
                        <img
                            src={emptyImg}
                            alt="Carrinho vazio"
                            className={styles.emptyImg}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/home");
                            }}
                        >
                            Adicionar itens
                        </button>
                    </section>
                )}
                {items.length === 0 ? (
                    ""
                ) : (
                    <>
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
                                onClick={() => navigate("/info")}
                                className={styles.btn}
                                style={{ backgroundColor: "green" }}
                                type="button"
                            >
                                Finalizar
                            </button>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
