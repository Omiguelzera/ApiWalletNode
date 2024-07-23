import bcrypt from "bcrypt";
import usuarioRepository from "../repository/usuarioRepository.js";

async function cadastrar(body){
    
        const usuarioExiste = await usuarioRepository.findByEmail(body.email);
        if (usuarioExiste) throw new Error("Email já cadastrado");

        if (body.senha !== body.confirmSenha) throw new Error("Senhas não coincidem!");

        const hasPassword = bcrypt.hashSync(body.senha, 10);

        await usuarioRepository.create({...body, senha: hasPassword });
 

}


async function login(body){
    const usarioExiste = await usuarioRepository.findByEmail(body.email);
    if(!usarioExiste) throw new Error("Email ou senha incorretos");

    const senhaValida = bcrypt.compareSync(body.senha, usarioExiste.senha);
    if(!senhaValida) throw new Error ("Email ou senha incorretos");


    return usuarioRepository.generateToken(usarioExiste._id);
}

async function userLogged(id){
    const usuario = await usuarioRepository.findById(id)
    if(!usuario) throw new Error("Usuario não encontrado");
    return usuario;
}

export default {cadastrar, login, userLogged};