"use client";
import { useEffect } from "react";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/action";
const RegisterForm = () =>{
    const router = useRouter();
    const [state,formAction]=useFormState(registerUser,undefined)
     useEffect(()=>{
        state?.success && router.push("/login");
     },[state?.success,router]);

    return(

           <form action={formAction} className={styles.form}>
                <input type="text" placeholder="Username" name="username"/>
                
                <input type="email" placeholder="Email" name="email"/>
                
                <input type="password" placeholder="Password" name="password"/>
                
                <input type="password" placeholder="Confirm Password" name="confirmPassword"/>
                
                <input type="text" placeholder="image" name="img"/>
                
                <button>Register</button>
                {state?.error && <p>{state?.error}</p>}
                <Link href="/login"> Have an Account? <b>Login</b></Link>
            </form>
      
    )
}

export default RegisterForm;