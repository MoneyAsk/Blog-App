import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async(request,{params}) =>{
    const{slug} = params;
    try{
        connectToDb();
        const posts = await Post.findOne({slug});
        return NextResponse.json(posts);

        
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch Posts");
    }
}

export const DELETE = async(request,{params}) =>{
    const{slug} = params;
    try{
        connectToDb();
        await Post.deleteOneOne({slug});
        return NextResponse.json("Post Deleted");

        
    }catch(error){
        console.log(error);
        throw new Error("Failed to Delete Posts");
    }
}
