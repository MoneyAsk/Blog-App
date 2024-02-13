"use client";
import { useFormState } from "react-dom";
import styles from "./logiForm.module.css";
const { Login } = require("@/lib/action");
const { default: Link } = require("next/link");
const { useRouter } = require("next/navigation");

const LoginForm = () => {
    const [state,formAction]=useFormState(Login,undefined)
    const router = useRouter();


    return(
        <div>
            <form action={formAction} className={styles.form}>
                <input type="text" placeholder="username" name="username" />
                <input type="password" placeholder="password" name="password" />
                <button>Login with credentials</button>
                {state?.error && <p>{state?.error}</p>}
                <Link href="/register"> Don&apos;t have an Account? <b>Register</b></Link>
            </form>
        </div>
    )
}
export default LoginForm;