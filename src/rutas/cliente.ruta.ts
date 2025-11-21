import { Router } from "express"
import { ClientesController } from "../controllers/cliente.controller"
import { revisarValidacion } from "../middlewares/validacion"
import { clienteChecks } from "../dtos/cliente.dto"

const clienteRouter = Router()
const controller = new ClientesController()

clienteRouter.post('/clientes', clienteChecks, revisarValidacion, controller.agregarAsync)
clienteRouter.get('/clientes/inicioDeSesiones', controller.iniciarSesionAsync)

export default clienteRouter