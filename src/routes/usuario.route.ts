
import { Router } from 'express';
import { verificarUsuario } from '../controllers/usuario.controller';

const router: Router = Router();

//GET / --- > listarPersonas
//POST / ---> insertarPersona
//GET /{idPersona} ---> Obtener persona
//PUT /{idPersona} ---> Editar Persona

router.post('/verificar', verificarUsuario);

export default router;