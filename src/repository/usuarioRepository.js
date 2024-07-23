import UserSchema from "../schema/Usuario.js"
import jwt from "jsonwebtoken";
import "dotenv/config";

async function create(data){
    return await UserSchema.create(data)
}

async function findByEmail(email){
    
    const usuario = await UserSchema.findOne({ email });
    return usuario;
}

async function generateToken(id){
    return jwt.sign({ id }, process.env.SECRET, {expiresIn: 846400});

}

async function findById(id){
    const usuario = await UserSchema.findById(id);
    return usuario;
}


export default {create, findByEmail, generateToken, findById};