import express, {json} from 'express';
import {conectaBanco} from './database/conectaBanco.js';
import usuarioRoute from './routes/usuarioRoute.js';

const port = process.env.PORT;
const app = express();

app.use(json());

app.use(usuarioRoute);

conectaBanco();
app.listen(port, ()=> console.log("Ouvindo a entradinha hmmm hehe!!"));