import { Router } from "express";
import usuarioControle from "../controller/usuarioControle.js"


const usuarioRoute = Router();

usuarioRoute.post("/Cadastrar", usuarioControle.cadastro);
usuarioRoute.post("Entrar", usuarioControle.login);

export default usuarioRoute;