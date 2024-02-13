"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import { log } from "console";
import bcrypt from "bcrypt";




export const addPost = async(prevState,formData) =>{
   
    const {title,desc,slug,userId,img} = Object.fromEntries(formData)
    console.log(title,desc,slug,userId,img);

    try{

        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        });
        await newPost.save();
        // return {message: "Post added successfully"};
        console.log("Post added successfully");
        revalidatePath("/blog");
        revalidatePath("/admin");


        
    }catch(err){
        console.log(err);
        return {error: "Something went wrong"}
    }
};

export const addUser = async(prevState,formData) =>{
   
    const {username,email,password,img} = Object.fromEntries(formData)
    console.log(username,email,password,img);

    try{

        connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img
        });
        await newUser.save();
        // return {message: "Post added successfully"};
        console.log("Post added successfully");
        revalidatePath("/admin");
        
    }catch(err){
        console.log(err);
        return {error: "Something went wrong"}
    }
};

export const deletePost = async(formData) =>{
   
    const {id} = Object.fromEntries(formData);


    try{

        connectToDb();
      
        await Post.findByIdAndDelete(id);

        // return {message: "Post added successfully"};
        console.log("deleted successfully");
        revalidatePath("/blog");
        revalidatePath("/admin");

        
    }catch(err){
        console.log(err);
        return {error: "Something went wrong"}
    }
};

export const deleteUser = async(formData) =>{
   
    const {id} = Object.fromEntries(formData);


    try{

        connectToDb();
        await Post.deleteMany({userId:id});
        await User.findByIdAndDelete(id);

        // return {message: "Post added successfully"};
        console.log("deleted successfully");
        revalidatePath("/admin");
        
    }catch(err){
        console.log(err);
        return {error: "Something went wrong"}
    }
};


export const handleLogin = async() =>{
    "use server"
    await signIn("github");

}

export const handleLogout = async() =>{
    await signOut("github");
}

export const registerUser = async(previousState,formData) =>{
    const {username,email,password,confirmPassword,img} = Object.fromEntries(formData);
    if(password !== confirmPassword){
        return {error: "Passwords do not match"};
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    try {
        connectToDb();
        const user = await User.findOne({username});
        if(user){
            return {error: "Username already exists"};
        }
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            img
        });
        await newUser.save();
        log("User added successfully");
        return {success: true};
    } catch (error) {
        console.log(error);
        return {error: "Something went wrong"};
    }  
};

export const Login = async(previousState,formData) =>{
    const {username,password} = Object.fromEntries(formData);
    try {
        await signIn("credentials",{username,password}) ;
        
    } catch (error) {
        // console.log(error);

        if(error.type && error.type.includes("CredentialsSignin")){
            return {error: "Invalid credentials"};
        }

        // return {error: "Something went wrong"};
        throw error;
    }  
};

// export default addPost;  
// export default handleLogin;

