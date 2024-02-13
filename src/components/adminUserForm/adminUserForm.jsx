"use client"
import { addUser } from '@/lib/action';
import styles from './adminUserform.module.css';
import {useFormState} from "react-dom";
const AdminUserForm =()=>{
    const [state, formAction] = useFormState(addUser,undefined);  
    
    return (
           <form action={formAction} className={styles.container}>
                <h1>Add New User</h1>
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="email" placeholder="email" />
                <input type="text" name="password" placeholder="password" />
                <input type="text" name="img" placeholder="img" />
                <select name="isAdmin">
                    <option value="false">is Admin?</option>
                    <option value="true">Admin</option>
                    <option value="false">User</option>
                </select>
                <button >Add User</button>
                {state && state.error}
           </form>
        );
};

export default AdminUserForm;