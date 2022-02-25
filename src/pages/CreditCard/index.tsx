/* eslint-disable react/jsx-boolean-value */
import { MutableRefObject, useRef, useState } from "react";
import { Header } from "../../components/Header";
import chipImg from "../../assets/chip.png";
import styles from "./styles.module.scss";
import { HeaderShop } from "../../components/HeaderShop";

export function CreditCard() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const cvvRef = useRef() as MutableRefObject<HTMLInputElement>;
    const cardRef = useRef() as MutableRefObject<HTMLDivElement>;
    function handleFocus() {
        cardRef.current.style.transform = "rotateY(-180deg)";
    }
    function handleOut() {
        cardRef.current.style.transform = "rotateY(0)";
    }
    return (
        <>
            <Header />
            <HeaderShop activeFinish />
            <form className={styles.creditForm}>
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
                        />
                    </div>
                </div>
                <h3>Informações do Cartão</h3>
                <div className={styles.groupCard}>
                    <input
                        className={styles.inpt}
                        type="text"
                        name="number"
                        placeholder="Número do cartão"
                        maxLength={19}
                        value={number}
                        onChange={(event) => {
                            setNumber(event.target.value);
                        }}
                    />
                    <input
                        className={styles.inpt}
                        type="text"
                        name="name"
                        placeholder="Nome no cartão"
                        maxLength={40}
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <div className={styles.group}>
                        <input
                            className={styles.inpt}
                            type="text"
                            name="month"
                            placeholder="Mês"
                            value={month}
                            onChange={(event) => {
                                setMonth(event.target.value);
                            }}
                            maxLength={2}
                        />
                        <input
                            className={styles.inpt}
                            type="text"
                            name="year"
                            placeholder="Ano"
                            value={year}
                            onChange={(event) => {
                                setYear(event.target.value);
                            }}
                            maxLength={2}
                        />
                    </div>
                    <input
                        className={`${styles.inpt} ${styles.cvvInpt}`}
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(event) => {
                            setCvv(event.target.value);
                        }}
                        maxLength={3}
                        onFocus={handleFocus}
                        onBlur={handleOut}
                        ref={cvvRef}
                    />
                    <button type="submit" className={styles.btnSuccess}>
                        Finalizar
                    </button>
                </div>
            </form>
        </>
    );
}
