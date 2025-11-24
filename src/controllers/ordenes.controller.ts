import { Request, Response } from "express"
import { OrdenDtoIn } from "../dtos/orden.dto"
import { OrdenRdn } from "../reglasDeNegocio/orden.rdn"
import jwt from "jsonwebtoken"
import { IdDto } from "../dtos/id.dto"
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo"

export class OrdenesController {
    private ordenRdn: OrdenRdn
    constructor() {
        this.ordenRdn = new OrdenRdn()
    }

    agregarAsync = async (req: Request, res: Response) => {
        //console.log("req.body", req.body)
        const clienteId = obtenerClienteIdDesdeToken(req)
        const orden: OrdenDtoIn = new OrdenDtoIn(req.body)
        const ordenRegistrada = await this.ordenRdn.obtenerPorIdAsync(orden.encodedkey)
        if (ordenRegistrada) {
            const idDto: IdDto = { 
                id: ordenRegistrada.id, 
                encodedkey: ordenRegistrada.encodedkey, 
                fecha: new Date() 
            }

            return res.status(208).json(idDto);
        }
        const idDto = await this.ordenRdn.agregarAsync(clienteId, orden)

        return res.status(201).json(idDto);
    }

    obtenerPorId = async (req: Request, res: Response) => {
        const encodedkey = req.params.encodedkey
        const orden = await this.ordenRdn.obtenerPorIdAsync(encodedkey)
        if (!orden) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
    
        return res.status(200).json(orden);
    }    

}

function obtenerClienteIdDesdeToken(req: Request): string {
    const header = req.header("Authorization") || ""
    const token = header.split(" ")[1]
    const payload = jwt.verify(token, secret)
    //console.log("payload", payload)
    const clienteId = (payload as any).encodedkey

    return clienteId
}
