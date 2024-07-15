import UserSchema from "../schema/Usuario.js"
import jwt from "jsonwebtoken";

async function create(data){
    return await UserSchema.create(data)
}

async function findByEmail(email){
    
    const usuario = await UserSchema.findOne({ email });
    return usuario;
}

async function generateToken(id){
    return id;
}


export default {create, findByEmail, generateToken};