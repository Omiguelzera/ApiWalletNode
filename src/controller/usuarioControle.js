import usuarioService from "../service/usuarioService.js"

async function cadastro (req, res){
    try{
          await usuarioService.cadastrar(req.body);
          return res.status(201).send("Usuario cadastrado com sucesso !");

    }catch(error){
          return res.status(409).send(error.message);
    }
}

async function login(req, res){
      const body = req.body
      try{
            const token = await usuarioService.login(body)
            return res.status(201).send(token);
      }catch(error){
            return res.status(401).send(error.message)
      }
}

export default { cadastro, login };