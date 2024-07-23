import { Router } from "express";
import usuarioControle from "../controller/usuarioControle.js"
import autenticacaoMiddleware from "../middleware/autenticacaoMiddleware.js";
import { validacaoMiddleware } from "../middleware/validacaoMiddleware.js";
import { validacaoUsuario } from "../schema/validation/validacaoUsuario.js";
import { validacaoLog } from "../schema/validation/validacaoLog.js";



const usuarioRoute = Router();

usuarioRoute.post("/Cadastrar", validacaoMiddleware(validacaoUsuario) ,usuarioControle.cadastro);
usuarioRoute.post("/Login", validacaoMiddleware(validacaoLog) ,usuarioControle.login);
usuarioRoute.get("/usuarioLogged", autenticacaoMiddleware,usuarioControle.userLogged);

export default usuarioRoute;