import TransacoesSchema from "../schema/Transacoes.js";

async function create(data){
    return await TransacoesSchema.create(data);
}

export default (create);