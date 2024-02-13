import Link from "next/link";
import Links from "../links/Links";
import Styles from "./navbar.module.css";
import { auth } from "@/lib/auth";

const Navbar =async()=>{
    const session = await auth();
    // console.log(session);
    return(
        <div className={Styles.container}>
            <Link href="/" className={Styles.logo} >Logo</Link>
            <div><Links session ={session}/></div>
            
        </div>
    )
}
export default Navbar; 