"use client";
import Image from "next/image";
import Styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";
const links=[
    {   title:"Homepage",
        path:"/"    
    },
    {   title:"About",
        path:"/about"    
    },       
    {   title:"Contact",
        path:"/contact"    
    },
    {   title:"Blog",
        path:"/blog"    
    }        
];
const Links =({session}) =>{
    const [open, setOpen]=useState(false);

    //TEMPORARY
    // const session = true;
    // const isAdmin = true; 

    return(
        <div className={Styles.container}>

        <div className={Styles.links}>
            {links.map((link=>(
                <NavLink item={link} key={link.title}/>
                )))}
            {session?.user ? (
                <>
                    {session.user?.isAdmin && <NavLink item={{title:"Admin", path:"/admin"}}/>}
                    <form action={handleLogout}>
                    <button className={Styles.logout}>Logout</button>

                    </form>
                </>
            ) : (
                <NavLink item={{title:"Login", path:"/login"}}/>                
                )}
        </div>
        {/* <button className={Styles.menuButton} onClick={()=>{
            setOpen((prev)=>!prev);
        }}>Menu</button> */}
        <Image src="/menu.png" alt="post" width={30} height={30} onClick={()=>{
            setOpen((prev)=>!prev);
        }} className={Styles.menuButton}/>
        {
            open && <div className={Styles.mobileLinks}>
            {links.map((link=>(
                <NavLink item={link} key={link.title}/>
                )))}
            </div>
                                    
        }
        </div>

    )
}

export default Links;