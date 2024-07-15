import express, {json} from 'express';
import {conectaBanco} from './database/conectaBanco.js';
import usuarioRoute from './routes/usuarioRoute.js';

const app = express();

app.use(json());

app.use(usuarioRoute);

conectaBanco();
app.listen(5003, ()=> console.log("Ouvindo a entradinha hmmm hehe!!"));