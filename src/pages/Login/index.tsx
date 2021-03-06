import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Input } from "../../components/Input";
import { UserContext } from "../../hooks/useAuth";
import { clear, setItem, setLogged } from "../../storage";
import styles from "./styles.module.scss";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLogged, setIsLogged } = useContext(UserContext);
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
            toast.success("Bem vindo!");
            clear();
            setIsLogged(true);
            setLogged("user", "logged");
            setItem("PRODUCTS", []);
            navigate("/home");
        } catch (err: yup.ValidationError | any) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if (isLogged) {
            navigate("/home");
        }
    }, [isLogged, navigate]);
    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <svg
                    width="74"
                    height="61"
                    viewBox="0 0 74 61"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.mug}
                >
                    <g id={styles.logo}>
                        <rect
                            id="bg"
                            width="74"
                            height="61"
                            rx="5"
                            fill="#3942F7"
                        />
                        <g id="mug">
                            <path
                                id={styles.coffe}
                                d="M25.4277 18.7207C26.3994 18.7207 27.1855 17.9346 27.1855 16.9629V6.75781C27.1855 5.78613 26.3994 5 25.4277 5C24.4561 5 23.6699 5.78613 23.6699 6.75781V16.9629C23.6699 17.9346 24.4561 18.7207 25.4277 18.7207ZM55.3594 25.752H49.5C49.5 23.8086 47.9277 22.2363 45.9844 22.2363H21.7656C19.8223 22.2363 18.25 23.8086 18.25 25.752V37.8613C18.25 38.0273 18.2598 38.1885 18.2842 38.3447C18.2598 38.6865 18.25 39.0283 18.25 39.375C18.25 48.0029 25.2471 55 33.875 55C41.6924 55 48.167 49.2627 49.3193 41.7676H55.3594C57.3027 41.7676 58.875 40.1953 58.875 38.252V29.2676C58.875 27.3242 57.3027 25.752 55.3594 25.752ZM45.9844 38.252H45.9307C45.9648 38.623 45.9844 38.9941 45.9844 39.375C45.9844 46.0645 40.5645 51.4844 33.875 51.4844C27.1855 51.4844 21.7656 46.0645 21.7656 39.375C21.7656 38.9941 21.7852 38.623 21.8193 38.252H21.7656V25.752H45.9844V38.252ZM55.3594 37.8613H49.8906V29.2676H55.3594V37.8613ZM41.9316 18.7207C42.9033 18.7207 43.6895 17.9346 43.6895 16.9629V6.75781C43.6895 5.78613 42.9033 5 41.9316 5C40.96 5 40.1738 5.78613 40.1738 6.75781V16.9629C40.1738 17.9346 40.96 18.7207 41.9316 18.7207ZM33.6309 18.7207C34.6025 18.7207 35.3887 17.9346 35.3887 16.9629V6.75781C35.3887 5.78613 34.6025 5 33.6309 5C32.6592 5 31.873 5.78613 31.873 6.75781V16.9629C31.873 17.9346 32.6592 18.7207 33.6309 18.7207Z"
                                fill="#EDF2F7"
                            />
                        </g>
                    </g>
                </svg>

                <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={styles.inpt}
                    autoComplete="off"
                    value={email}
                    data-testid="email"
                    onChange={(event) => {
                        setEmail(event.currentTarget.value);
                    }}
                />
                <Input
                    type="password"
                    name="password"
                    data-testid="password"
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
