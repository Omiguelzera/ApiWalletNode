import UserSchema from "../schema/Usuario.js"

async function create(data){
    return await UserSchema.create(data)
}

async function findByEmail(email){
    
    const usuario = await UserSchema.findOne({ email });
    return usuario;
}


export default {create, findByEmail};