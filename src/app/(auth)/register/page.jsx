import { registerUser } from "@/lib/action";
import styles from "./register.module.css";
import Image from "next/image";
import RegisterForm from "@/components/registerForm/registerForm";

const Register = () =>{
    return(
        <div className={styles.container}>
           <RegisterForm/>

            <Image src="/about.png" alt="post" width={550} height={500}/>

        </div>
    )
}
export default Register;