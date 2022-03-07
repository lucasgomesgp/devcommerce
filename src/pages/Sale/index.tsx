import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import saleImg from "../../assets/sale.svg";
import styles from "./styles.module.scss";

export function Sale() {
    const navigate = useNavigate();
    function handleHome() {
        navigate("/home");
    }
    return (
        <>
            <Header />
            <main className={styles.saleArea}>
                <section className={styles.central}>
                    <h5 className={styles.title}>
                        Compra realizada com sucesso!
                    </h5>
                    <img
                        src={saleImg}
                        alt="Sale item"
                        className={styles.saleImg}
                    />
                </section>
                <section className={styles.button}>
                    <button
                        type="button"
                        onClick={handleHome}
                        className={styles.btn}
                        data-cy="home"
                    >
                        Início
                    </button>
                </section>
            </main>
        </>
    );
}
