import { Router } from "express"
import { ProductosController } from "../controllers/productos.controller"
import { revisarValidacion } from "../middlewares/validacion"
import { productoChecks } from "../dtos/produto.dto"

const productoRouter = Router()
const controller = new ProductosController()

productoRouter.post('/productos', productoChecks, revisarValidacion, controller.agregarAsync)
productoRouter.get('/productos', controller.obtenerTodosAsync)

export default productoRouter