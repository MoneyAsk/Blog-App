import { getUser, getUsers } from '@/lib/data';
import style from './postUser.module.css';
import Image from 'next/image';
// const getUsers = async (userId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{cache:'no-cache'});
//     const users = await res.json();
//     return users;
//   }

const PostUser=async({userId})=>{
    const user = await getUser(userId);
    // console.log(user);
    

   return(  
    <div className={style.container}>
        <Image src={user.img ? user.img:"/noavatar.png"} alt="user" width={50} height={50} className={style.avatar}/>
        <div className={style.texts}>

        <span className={style.title}>Author</span>
        <span className={style.username}>{user.username}</span>
        </div>
     </div>
   )
    
}

export default PostUser;