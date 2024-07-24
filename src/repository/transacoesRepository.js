import TransacoesSchema from "../schema/Transacoes.js";

async function create(data){
    return await TransacoesSchema.create(data);
}

async function findByUsuario(id){
    return await TransacoesSchema.find({ usuarioId: id });
}

async function deleteTransacao(id){
    return await TransacoesSchema.findByIdAndDelete({ usuarioId: id});
}

async function findById(id){
    return await TransacoesSchema.findById(id);
}
export default {create, findByUsuario, deleteTransacao, findById};