
import 'dotenv/config'
import usuarioRouter from './routes/usuario.route';
import express, { Application,json } from 'express';
import cors from 'cors';

//dato sobre categoria:
import categoriaRouter from './routes/categoria.route';

const app: Application = express();
// CORS
app.use(cors()); 

app.use(json());

app.use('/api/v1/usuarios', usuarioRouter);
//dato sobre categoria
app.use('/api/v1/categorias', categoriaRouter);

export default app; 
