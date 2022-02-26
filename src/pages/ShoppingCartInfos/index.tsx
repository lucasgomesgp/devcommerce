import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Header } from "../../components/Header";
import { HeaderShop } from "../../components/HeaderShop";
import { cepApi } from "../../service/cep";
import { Cep } from "./ShoppingCartInfos.types";
import styles from "./styles.module.scss";

export function ShoppingCartInfos() {
    const [cep, setCep] = useState<Cep>({} as Cep);
    const [cepLocal, setCepLocal] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const shopSchema = yup.object({
        lastName: yup.string().required("O sobrenome é obrigatório"),
        name: yup.string().required("O nome é obrigatório"),
    });

    async function handleSendCep(event?: SyntheticEvent) {
        event?.preventDefault();
        try {
            const { data } = await cepApi.get(`${cepLocal}/json`);
            setCep(data);
        } catch (err) {
            toast.error("Erro ao buscar o CEP");
        }
    }

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        try {
            await shopSchema.validate({ name, lastName });
            toast.success("Passo 2 concluído");
            navigate("/card");
        } catch (err: yup.ValidationError | any) {
            toast.error(err.message);
        }
    }
    useEffect(() => {
        if (cepLocal.length === 8 || cepLocal.length === 9) {
            handleSendCep();
        }
        if (cepLocal.length === 0) {
            setCep({} as Cep);
        }
    }, [cepLocal]);

    return (
        <>
            <Header />
            <HeaderShop activeInfo />
            <main className={styles.form}>
                <h2 className={styles.title}>Informações</h2>
                <form className={styles.infosForm} onSubmit={handleSubmit}>
                    <div className={styles.groupForm}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            className={`${styles.inptForm} ${styles.inpt}`}
                            autoComplete="off"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            value={name}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Sobrenome"
                            className={`${styles.inptForm} ${styles.inpt}`}
                            autoComplete="off"
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                            value={lastName}
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
                            <p className={styles.cepMessage}>
                                Informações do seu CEP
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className={styles.sendBtn}
                    onClick={handleSubmit}
                >
                    Continuar
                </button>
            </main>
        </>
    );
}
