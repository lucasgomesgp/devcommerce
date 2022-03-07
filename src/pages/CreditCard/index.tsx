import { MutableRefObject, SyntheticEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Header } from "../../components/Header";
import chipImg from "../../assets/chip.png";
import { HeaderShop } from "../../components/HeaderShop";
import { removeItem } from "../../storage";
import { useShop } from "../../hooks/useShop";
import { cardNumberMask, cvvMask, monthYearMask, textMask } from "../../masks";
import styles from "./styles.module.scss";

export function CreditCard() {
    const navigate = useNavigate();
    const { setItems } = useShop();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const cvvRef = useRef() as MutableRefObject<HTMLInputElement>;
    const cardRef = useRef() as MutableRefObject<HTMLDivElement>;

    const cardSchema = yup.object({
        cvv: yup.string().required("O CVV é obrigatório"),
        year: yup.string().required("O ano é obrigatório"),
        month: yup.string().required("O mês é obrigatório"),
        name: yup.string().required("O nome no cartão é obrigatório"),
        number: yup.string().required("O número é obrigatório"),
    });

    function handleFocus() {
        cardRef.current.style.transform = "rotateY(-180deg)";
    }
    function handleOut() {
        cardRef.current.style.transform = "rotateY(0)";
    }
    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        try {
            await cardSchema.validate({ name, number, month, year, cvv });
            toast.success("Compra concluída com sucesso!");
            setItems([]);
            removeItem("PRODUCTS");
            navigate("/sale");
        } catch (err: yup.ValidationError | any) {
            toast.error(err.message);
        }
    }
    return (
        <>
            <Header />
            <HeaderShop activeFinish />
            <form className={styles.creditForm} onSubmit={handleSubmit}>
                <div className={styles.card} ref={cardRef}>
                    <div className={styles.front}>
                        <img src={chipImg} alt="Chip" className={styles.chip} />
                        <div className={styles.number}>{number}</div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.monthYear}>
                            {month || year ? (
                                <span>
                                    Validade:{month} / {year}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={styles.back}>
                        <input
                            type="text"
                            disabled
                            className={styles.cvv}
                            value={cvv}
                            data-cy="cvv"
                        />
                    </div>
                </div>
                <h3>Informações do Cartão</h3>
                <div className={styles.groupCard}>
                    <input
                        className={styles.inpt}
                        type="text"
                        autoComplete="off"
                        name="number"
                        placeholder="Número do cartão"
                        maxLength={19}
                        value={number}
                        onChange={(event) => {
                            setNumber(cardNumberMask(event.target.value));
                        }}
                    />
                    <input
                        className={styles.inpt}
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Nome no cartão"
                        maxLength={40}
                        value={name}
                        onChange={(event) => {
                            setName(textMask(event.target.value));
                        }}
                    />
                    <div className={styles.group}>
                        <input
                            className={styles.inpt}
                            type="text"
                            autoComplete="off"
                            name="month"
                            placeholder="Mês"
                            value={month}
                            onChange={(event) => {
                                setMonth(monthYearMask(event.target.value));
                            }}
                            maxLength={2}
                        />
                        <input
                            className={styles.inpt}
                            type="text"
                            autoComplete="off"
                            name="year"
                            placeholder="Ano"
                            value={year}
                            onChange={(event) => {
                                setYear(monthYearMask(event.target.value));
                            }}
                            maxLength={2}
                        />
                    </div>
                    <input
                        className={`${styles.inpt} ${styles.cvvInpt}`}
                        type="text"
                        autoComplete="off"
                        name="cvv"
                        placeholder="CVV"
                        data-testid="cvv"
                        value={cvv}
                        onChange={(event) => {
                            setCvv(cvvMask(event.target.value));
                        }}
                        maxLength={3}
                        onFocus={handleFocus}
                        onBlur={handleOut}
                        ref={cvvRef}
                    />
                    <button
                        type="submit"
                        className={styles.btnSuccess}
                        data-cy="done"
                    >
                        Finalizar
                    </button>
                </div>
            </form>
        </>
    );
}
