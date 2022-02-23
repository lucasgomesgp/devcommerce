import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import logoImg from "../../assets/logo.png";
import styles from "./styles.module.scss";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const schema = yup.object().shape({
        password: yup
            .string()
            .min(8, "A senha deve conter no mínimo 8 caracteres")
            .required("A senha é obrigatória"),
        email: yup
            .string()
            .email("Preencha um email válido")
            .required("O email é obrigatório"),
    });
    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        try {
            await schema.validate({ email, password });
            toast.success("Bem vindo");
            navigate("/home");
        } catch (err: yup.ValidationError | any) {
            toast.error(err.message);
        }
    }

    return (
        <main className={styles.container}>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <img src={logoImg} alt="logo" className={styles.logo} />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={styles.inpt}
                    autoComplete="off"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.currentTarget.value);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    className={styles.inpt}
                    autoComplete="off"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.currentTarget.value);
                    }}
                />
                <button className={styles.btnLogin} type="submit">
                    Entrar
                </button>
            </form>
        </main>
    );
}
