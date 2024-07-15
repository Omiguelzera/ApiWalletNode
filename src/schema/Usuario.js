import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nome: { type: String, required: true, trim: true },
    sobrenome: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    cpf: { type: String, unique: true, required: true, trim: true }, // Alterado para String
    telefone: { type: String, required: true, trim: true }, // Alterado para String e corrigido 'lowercase'
    senha: { type: String, required: true }
}, {
    timestamps: true
});

export default model("Usuarios", UserSchema);