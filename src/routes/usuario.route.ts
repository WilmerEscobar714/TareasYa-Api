
import { Router } from 'express';
import { verificarUsuario,crearUsuario,listarUsuarios  } from '../controllers/usuario.controller';

const router: Router = Router();

//GET / --- > listarPersonas
//POST / ---> insertarPersona
//GET /{idPersona} ---> Obtener persona
//PUT /{idPersona} ---> Editar Persona

router.post('/verificar', verificarUsuario);
router.post('/crear', crearUsuario);
router.get('/', listarUsuarios);


export default router;