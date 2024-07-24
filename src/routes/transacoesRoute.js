import { Router } from "express";

const transacoesRoute = Router();


transacoesRoute.get("/transacoes", transacoesControle.create);

export default transacoesRoute;