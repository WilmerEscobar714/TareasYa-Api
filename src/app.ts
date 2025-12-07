
import 'dotenv/config'
import express, { Application,json } from 'express';
import usuarioRouter from './routes/usuario.route';
import categoriasRouter from './routes/categorias.routes';


const app: Application = express();

app.use(json());

app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/categorias', categoriasRouter);

export default app; 
