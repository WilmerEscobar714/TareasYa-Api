// routes/dashboard.routes.ts - VERSIÓN LIMPIA
import { Router } from 'express';
import { getDashboardStats, getUsuariosDetallados } from '../services/dashboard.service';
import { BaseResponse } from '../shared/base-response';
import AppDataSource from '../config/datasource';
import { Tarea } from '../entities/tareas';

const router: Router = Router();

// GET /api/v1/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(BaseResponse.success(stats));
  } catch (error) {
    res.status(500).json(BaseResponse.error('Error al obtener estadísticas'));
  }
});

// GET /api/v1/dashboard/usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = parseInt(req.query.limite as string) || 20;
    
    const usuarios = await getUsuariosDetallados(pagina, limite);
    res.json(BaseResponse.success(usuarios));
  } catch (error) {
    res.status(500).json(BaseResponse.error('Error al obtener usuarios'));
  }
});

// GET /api/v1/dashboard/tareas/recientes
router.get('/tareas/recientes', async (req, res) => {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    
    const tareaRepo = AppDataSource.getRepository(Tarea);
    
    const tareasRecientes = await tareaRepo
      .createQueryBuilder("tarea")
      .leftJoin("tarea.usuario", "usuario")
      .leftJoin("tarea.categoria", "categoria")
      .select([
        "tarea.idTarea",
        "tarea.titulo",
        "tarea.descripcion",
        "tarea.estado",
        "tarea.fechaCreacion",
        "usuario.nombre",
        "usuario.apePaterno",
        "categoria.nombreCat as categoria"
      ])
      .orderBy("tarea.fechaCreacion", "DESC")
      .limit(10)
      .getRawMany();

    res.json(BaseResponse.success(tareasRecientes));
  } catch (error) {
    res.status(500).json(BaseResponse.error('Error al obtener tareas recientes'));
  }
});

export default router;