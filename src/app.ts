import 'dotenv/config'
import express, { Application, json } from 'express';
import cors from 'cors';

// Importar routers
import categoriaRouter from './routes/categorias.routes';
import usuarioRouter from './routes/usuario.route';
import tareasRouter from './routes/tareas.routes';
import subtareasRouter from './routes/subtareas.routes';

const app: Application = express();

// CORS
app.use(cors()); 
app.use(json());

// Rutas
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/categorias', categoriaRouter);
app.use('/api/v1/tareas', tareasRouter);
app.use('/api/v1/subtareas', subtareasRouter);

export default app;