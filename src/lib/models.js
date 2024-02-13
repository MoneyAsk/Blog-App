 import { time } from 'console'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            min:3,
            max:20
        },
        email:{
            type:String,
            required:true,
            unique:true,
            max:50
        },
        password:{
            type:String,
            min:6
        },
        img:{
            type:String,
            // default:""
        },
        isAdmin:{
            type:Boolean, 
            default:false            
        }        
 },{timeStamps:true});

 const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        // default:""
    },
    userId:{
        type:String, 
        required:true,       
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
     
},{timeStamps:true});

// export const User = mongoose.model.User || mongoose.model('User',userSchema);
// export const Post = mongoose.model.Post || mongoose.model('Post',postSchema);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

