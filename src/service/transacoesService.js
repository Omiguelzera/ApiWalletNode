import transacoesRepository from "../repository/transacoesRepository.js"

async function create(body, id){
    if(!id) throw new Error("Id do usuario é necessario !");
    return await transacoesRepository.create({...body, usuarioId: id});
}
async function findByUsuario(id){
    if(!id) throw new Error("Id do usuario é necessario !");
    return await transacoesRepository.findByUsuario(id);
}

export default {create, findByUsuario};