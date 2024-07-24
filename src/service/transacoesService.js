import transacoesRepository from "../repository/transacoesRepository.js"

async function create(body, id){
    if(!id) throw new Error("Id do usuario é necessario !");
    return await transacoesRepository.create({...body, usuarioId: id});
}
async function findByUsuario(id){
    if(!id) throw new Error("Id do usuario é necessario !");
    return await transacoesRepository.findByUsuario(id);
}

async function deleteTransacao(id, usuarioId){

    
        const transacaoUsuario = await transacoesRepository.findById(id);
        if (!transacaoUsuario) {
            throw new Error("Transação não encontrada");
        }

        console.log(`usuarioId: ${usuarioId}, tipo: ${typeof usuarioId}`);
        console.log(`transacaoUsuario.usuarioId: ${transacaoUsuario.usuarioId}, tipo: ${typeof transacaoUsuario.usuarioId}`);
    
        if (!usuarioId || !transacaoUsuario.usuarioId) {
            throw new Error("Identificadores inválidos");
        }
    
        if (usuarioId.toString() !== transacaoUsuario.usuarioId.toString()) {
            throw new Error("Você não tem permissão para deletar essa transação");
        }

       return await transacoesRepository.deleteTransacao(id);
        
 
    
}

export default {create, findByUsuario, deleteTransacao};