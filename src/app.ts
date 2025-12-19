import 'dotenv/config'
import express, { Application, json } from 'express';
import cors from 'cors';

// Importar routers
import categoriaRouter from './routes/categorias.routes';
import usuarioRouter from './routes/usuario.route';
import tareasRouter from './routes/tareas.routes';
import subtareasRouter from './routes/subtareas.routes';

import dashboardRouter from './routes/dashboard.routes';

const app: Application = express();

// CORS configurado para que asepte react
app.use(cors({
  origin: 'http://localhost:3001', // URL del React
  credentials: true
})); 
app.use(json());

// Rutas
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/categorias', categoriaRouter);
app.use('/api/v1/tareas', tareasRouter);
app.use('/api/v1/subtareas', subtareasRouter);

app.use('/api/v1/dashboard', dashboardRouter);

export default app;