import transacoesService from "../service/transacoesService.js";

async function create(req, res){
    const body = req.body;
    const {_id: id} = res.locals.user;

    try{
        const transacao = await transacoesService.create(body, id);
        return res.status(201).send(transacao);
    }catch(error){
 
        return res.status(409).send(error.message);
    }
}

async function findByUsuario(req, res){
    const{_id: id} = res.locals.user;

    try{
        const transacao = await transacoesService.findByUsuario(id)
        return res.send(transacao);
    }catch(error){
        return res.status(409).send(error.message);
    }
}

export default { create, findByUsuario }