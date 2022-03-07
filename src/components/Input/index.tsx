import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...rest }: InputProps) {
    return <input {...rest} className={styles.inpt} />;
}
