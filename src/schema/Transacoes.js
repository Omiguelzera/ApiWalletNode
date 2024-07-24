
import { Schema, model } from "mongoose";

const TransacoesSchema = new Schema({
    valor:{type: Number, required: true},
    descricao:{type: String, required: true},
    tipo:{type: String, required: true},
    usuarioId:{ type: Schema.Types.ObjectId, required: true, ref : "Usuarios"},
    created_at:{type: Date, required: true, default: Date.now}
});

export default model ("transacoes", TransacoesSchema)