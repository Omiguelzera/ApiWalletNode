import jwt from "jsonwebtoken";
import usuarioRepository from "../repository/usuarioRepository.js";

export default async function autenticacaoMiddleware(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ message: "Token inválido!" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
        return res.status(401).send({ message: "Token inválido!" });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: "Token inválido!" });
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).send({ message: "Token inválido!" });
        }

        try {
            const usuario = await usuarioRepository.findById(decoded.id);
            if (!usuario) {
                return res.status(401).send({ message: "Token inválido!" });
            }

            res.locals.user = usuario;
            next();
        } catch (error) {
            return res.status(500).send({ message: "Erro no servidor." });
        }
    });
}