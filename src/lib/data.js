import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { ObjectId } from "mongoose";


export async function getPosts() {
    try {
        connectToDb();
        const posts = await Post.find();
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts!");
    }
};

export async function getPost(slug) {
    try {
        connectToDb();
        const post = await Post.findOne({slug:slug}).lean();
        return post;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post!");
    }
};

// export async function getUser(id) {
//     try {
//         connectToDb();
//         const User = await User.findById(id);//same name hai isliye id likha hai otherwise ni to aise likhna hota {slug:slug}
//         return User;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to fetch user!");
//     }
// };

export const getUser = async (id) => {
    // noStore();
    try {
      connectToDb();
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch user!");
    }
  };

export async function getUsers() {
    try {
        connectToDb();
        const Users = await User.find();
        return Users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users!");
    }
};