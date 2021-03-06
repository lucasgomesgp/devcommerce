import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import mugImg from "../../assets/coffe.png";
import { CartItem } from "../../components/CartItem";
import { Item } from "./Home.types";
import { api } from "../../service/api";
import styles from "./styles.module.scss";

export function Home() {
    const [allItems, setAllItems] = useState<Item[]>([]);
    async function getData() {
        try {
            const items = await api.get("/items");
            setAllItems(items.data.items);
        } catch (err) {
            console.log("Erro");
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Header />
            <main className={styles.central}>
                <section className={styles.promotion}>
                    <h2 className={styles.title}>Promoção</h2>
                    <img
                        src={mugImg}
                        alt="Caneca de café"
                        className={styles.mug}
                    />
                </section>
            </main>
            <article className={styles.items}>
                <h2 className={styles.title}>Ofertas</h2>
                <div className={styles.subSections}>
                    {allItems.length ? (
                        allItems.map((item) => (
                            <CartItem
                                key={item.id}
                                name={item.name}
                                id={item.id}
                                src={item.src}
                                from={item.from}
                                to={item.to}
                            />
                        ))
                    ) : (
                        <div className={styles.loading} />
                    )}
                </div>
            </article>
        </>
    );
}
