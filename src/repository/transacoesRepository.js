import TransacoesSchema from "../schema/transacoes.js";

async function create(data){
    return await TransacoesSchema.create(data);
}

async function findByUsuario(id){
    return await TransacoesSchema.find({ usuarioId: id });
}

async function deleteTransacao(id){
    return await TransacoesSchema.findByIdAndDelete(id);
}

async function uptadeTransacao(id, data){
    return await TransacoesSchema.updateOne({_id: id}, data);
}

async function findById(id){
    return await TransacoesSchema.findById(id);
}
export default {create, findByUsuario, deleteTransacao, findById, uptadeTransacao};