import { Router } from "express";
import transacoesControle from "../controller/transacoesControle.js"
import autenticacaoMiddleware from "../middleware/autenticacaoMiddleware.js";

const transacoesRoute = Router();

transacoesRoute.use(autenticacaoMiddleware)


transacoesRoute.post("/",  transacoesControle.create);
transacoesRoute.get("/",  transacoesControle.findByUsuario);

export default transacoesRoute;