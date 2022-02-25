import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { HeaderShop } from "../../components/HeaderShop";
import { cepApi } from "../../service/cep";
import { Cep } from "./ShoppingCartInfos.types";
import styles from "./styles.module.scss";

export function ShoppingCartInfos() {
    const [cep, setCep] = useState<Cep>({} as Cep);
    const [cepLocal, setCepLocal] = useState("");
    const navigate = useNavigate();

    async function handleSendCep(event?: SyntheticEvent) {
        event?.preventDefault();
        try {
            const { data } = await cepApi.get(`${cepLocal}/json`);
            setCep(data);
        } catch (err) {
            console.log("Erro");
        }
    }
    useEffect(() => {
        if (cepLocal.length === 8 || cepLocal.length === 9) {
            handleSendCep();
        }
        if (cepLocal.length === 0) {
            setCep({} as Cep);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cepLocal]);

    return (
        <>
            <Header />
            <HeaderShop activeInfo />
            <main className={styles.form}>
                <h2 className={styles.title}>Informações</h2>
                <form className={styles.infosForm}>
                    <div className={styles.groupForm}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            className={`${styles.inptForm} ${styles.inpt}`}
                            autoComplete="off"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Sobrenome"
                            className={`${styles.inptForm} ${styles.inpt}`}
                            autoComplete="off"
                        />
                    </div>
                </form>
                <div className={styles.cepArea}>
                    <form className={styles.formCep} onSubmit={handleSendCep}>
                        <div className={styles.groupCol}>
                            <h4 className={styles.titleSection}>
                                Endereço de entrega
                            </h4>
                            <div className={styles.separator}>
                                <span />
                                <input
                                    type="search"
                                    placeholder="CEP"
                                    maxLength={9}
                                    className={`${styles.inptForm} ${styles.cep}`}
                                    value={cepLocal}
                                    onChange={(event) =>
                                        setCepLocal(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </form>
                    <div className={styles.infosCep}>
                        {cep.localidade ? (
                            <>
                                <p className={styles.city}>
                                    {cep.localidade}
                                    <span> - </span>
                                    <span className={styles.district}>
                                        {cep.uf}
                                    </span>
                                </p>
                                <p>{cep.logradouro}</p>
                                <p>{cep.bairro}</p>
                            </>
                        ) : (
                            "Informações do seu CEP"
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className={styles.sendBtn}
                    onClick={() => navigate("/card")}
                >
                    Continuar
                </button>
            </main>
        </>
    );
}
