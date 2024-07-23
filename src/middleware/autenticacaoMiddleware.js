import jwt from "jsonwebtoken";
import usuarioRepository from "../repository/usuarioRepository.js";

export default async function autenticacaoMiddleware(req, res, next){
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).send({ message: "Token invalido!" });

    const parts = authorization?.split(" ");
    if(parts.length !== 2 )
    return res.status(401).send({ message: "Token invalido!" });

    const[schema, token] =  parts;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({ message: "Token invalido!"});

    jwt.verify(token, process.env.SECRET, async (err, decode) =>{
        if(err) res.status(401).send({ message: "Token invalido!" })
            if(!decode) res.status(401).send({ message: "Token invalido!" })

                const usuario = await usuarioRepository.findById(decode.id);
                if(!usuario) return res.status(401).send({ message: "Token invalido!" });

                res.locals.user = usuario;

                next();
    })
}