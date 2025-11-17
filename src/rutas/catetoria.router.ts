import { Router } from "express";
import { CategoriaController } from "../controllers/categorias.controller";

const router = Router()
const controller = new CategoriaController()

router.post('/categorias',controller.agregarAsync)
router.get('/categorias', controller.obtenerTodosAsync)

export default router