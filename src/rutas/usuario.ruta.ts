import { Router } from "express"
import { UsuariosController } from "../controllers/usuarios.controller"
import { revisarValidacion } from "../middlewares/validacion"
import { usuarioChecks } from "../dtos/usuario.dto"

const usuarioRouter = Router()
const controller = new UsuariosController()

usuarioRouter.post('/usuarios/inicioDeSesiones', controller.iniciarSesionAsync)
usuarioRouter.post('/usuarios', usuarioChecks, revisarValidacion, controller.agregarAsync)

export default usuarioRouter