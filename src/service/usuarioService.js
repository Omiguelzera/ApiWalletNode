import bcrypt from "bcrypt";
import usuarioRepository from "../repository/usuarioRepository.js";

async function cadastrar(body){
    
        const usuarioExiste = await usuarioRepository.findByEmail(body.email);
        if (usuarioExiste) throw new Error("Email já cadastrado");

        if (body.senha !== body.confirmSenha) throw new Error("Senhas não coincidem!");

        const hasPassword = bcrypt.hashSync(body.senha, 10);

        await usuarioRepository.create({...body, senha: hasPassword });
 

}

export default {cadastrar};