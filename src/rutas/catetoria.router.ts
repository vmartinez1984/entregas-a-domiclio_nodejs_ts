import { Router } from "express"
import { CategoriaController } from "../controllers/categorias.controller";
import { categoriaChecks } from "../dtos/categoria.dto";
import { revisarValidacion } from "../middlewares/validacion";

const router = Router()
const controller = new CategoriaController()

router.post('/categorias', categoriaChecks, revisarValidacion, controller.agregarAsync)
router.get('/categorias', controller.obtenerTodosAsync)
router.put('/categorias/:idEncodedkey', categoriaChecks, revisarValidacion, controller.actualizarAsync)
router.delete('/categorias/:idEncodedkey', controller.borrarAsync)

export default router