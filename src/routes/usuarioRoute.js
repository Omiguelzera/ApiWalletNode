import { Router } from "express";
import usuarioControle from "../controller/usuarioControle.js"


const usuarioRoute = Router();

usuarioRoute.post("/Cadastrar", usuarioControle.cadastro);
usuarioRoute.post("Entrar", );

export default usuarioRoute;