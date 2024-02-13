import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
// import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { log } from "console";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({username:credentials.username});
        if(!user){
            throw new Error("Invalid user");   
        }
        const validPassword = await bcrypt.compare(credentials.password,user.password);
        // console.log(validPassword);
        if(!validPassword){
            throw new Error("Invalid password");
        }
        return user;

    } catch (error) {
        console.log(error);
        throw new Error("Failed to login");
        
    }
};

export const { handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({...authConfig,
    providers: [ GitHub ({
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET

    }),
    CredentialsProvider({
        async authorize(credentials){
            try {
               const user = await login(credentials);
            //    console.log(user.email);
                return {...user, email:user.email, isAdmin:user.isAdmin};
               
            } catch (error) {
                return null;
                
            }
        },
    }),
],
callbacks:{
    async signIn({user, account, profile}){
        if(account.provider === "github"){
        connectToDb();
        try {
            const user = await User.findOne({email:profile.email});
        if(!user){
            const newUser= new User({
                username:profile.login,
                email:profile.email ,
                img:profile.avatar_url
            });
            await newUser.save();
            }

        

        } catch (error) {
            console.log(error);
            // throw new Error("Failed to sign in");
            return false;
        }
    }
    return true;
    },
    ...authConfig.callbacks,
},

});

