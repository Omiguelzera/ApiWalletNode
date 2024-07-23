import { Router } from "express";
import usuarioControle from "../controller/usuarioControle.js"
import autenticacaoMiddleware from "../middleware/autenticacaoMiddleware.js";


const usuarioRoute = Router();

usuarioRoute.post("/Cadastrar", usuarioControle.cadastro);
usuarioRoute.post("/Login", usuarioControle.login);
usuarioRoute.get("/usuarioLogged", autenticacaoMiddleware,usuarioControle.userLogged);

export default usuarioRoute;