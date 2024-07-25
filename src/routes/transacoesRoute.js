import { Router } from "express";
import transacoesControle from "../controller/transacoesControle.js"
import autenticacaoMiddleware from "../middleware/autenticacaoMiddleware.js";
import { validacaoMiddleware } from "../middleware/validacaoMiddleware.js";
import { validaTransacoes } from "../schema/validation/validaTransacoes.js";

const transacoesRoute = Router();

transacoesRoute.use(autenticacaoMiddleware)


transacoesRoute.post("/", validacaoMiddleware(validaTransacoes), transacoesControle.create);
transacoesRoute.get("/",  transacoesControle.findByUsuario);
transacoesRoute.delete("/:id", transacoesControle.deleteTransacao);
transacoesRoute.put("/:id", transacoesControle.uptadeTransacao);

export default transacoesRoute;