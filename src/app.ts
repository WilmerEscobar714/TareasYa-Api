
import 'dotenv/config'
import usuarioRouter from './routes/usuario.route';
import express, { Application,json } from 'express';

const app: Application = express();

app.use(json());

app.use('/api/v1/usuarios', usuarioRouter);

export default app; 
