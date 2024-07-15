import mongoose from "mongoose";
import "dotenv/config";

export async function conectaBanco(){

    const url = process.env.DATABASE_URI;

    try{
        await mongoose.connect(url);
        console.log("Banco penetrado!");
    }catch(err){
          console.log(err.message)
    }
}

export default async function disconectaBanco(){
    await mongoose.disconnect();
}