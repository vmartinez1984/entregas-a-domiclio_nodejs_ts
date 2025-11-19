import { Router } from "express"
import { OrdenesController } from "../controllers/ordenes.controller";
import { verifyToken } from "../middlewares/token.middleware"

const ordenRouter = Router()
const controller = new OrdenesController()

ordenRouter.post('/ordenes', verifyToken, controller.agregarAsync)

export default ordenRouter