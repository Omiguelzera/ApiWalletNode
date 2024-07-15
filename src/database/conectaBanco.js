import mongoose from "mongoose";
import "dotenv/config";

export async function conectaBanco(){
    const url = "mongodb+srv://miguelgsantos98:JV3J2emAdg02ZTo4@cluster0.eidghq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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