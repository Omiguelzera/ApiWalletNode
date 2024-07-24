import TransacoesSchema from "../schema/Transacoes.js";

async function create(data){
    return await TransacoesSchema.create(data);
}

async function findByUsuario(id){
    return await TransacoesSchema.find({ usuarioId: id });
}

export default {create, findByUsuario};