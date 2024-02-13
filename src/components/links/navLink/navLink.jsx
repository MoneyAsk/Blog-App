"use    client";
const { default: Link } = require("next/link")
const { usePathname } = require("next/navigation")
import styles from "./navLink.module.css";

const NavLink=({item})=> {
    const pathName=usePathname();
    return (
       <Link href={item.path} className={`${styles.container} ${pathName==item.path && styles.active}`}>{item.title}</Link>
    );
};

export default NavLink;