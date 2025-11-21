import { Request, Response } from "express"
import { ClienteRdn } from "../reglasDeNegocio/cliente.rdn"
import { ClienteDtoIn } from "../dtos/cliente.dto"
import { IdDto } from "../dtos/id.dto"
import { InicioDeSesionDto } from "../dtos/inicio-de-sesion.dto"

export class ClientesController {
    private usuarioRdn: ClienteRdn

    constructor() {
        this.usuarioRdn = new ClienteRdn()
    }

    agregarAsync = async (req: Request, res: Response) => {
        //console.log(req.body)
        const usuario = new ClienteDtoIn(req.body)
        const usuarioregistrado = await this.usuarioRdn.obtenerPorIdAsync(usuario.encodedkey)
        if (usuarioregistrado) {
            const idDto: IdDto = {
                encodedkey: usuario.encodedkey,
                id: usuarioregistrado.id,
                fecha: new Date()
            }

            return res.status(208).json(idDto);
        } 
        //console.log(usuario)       
        const idDto = await this.usuarioRdn.agregarAsync(usuario)

        return res.status(201).json(idDto);
    }

    iniciarSesionAsync = async (req: Request, res: Response) => {
        console.log(req.headers.authorization)
        let authHeader = req.headers.authorization || ""
        const [type, credencialesEnBase64] = authHeader.split(" ")
        const credencialesDecodificadas = Buffer.from(credencialesEnBase64, 'base64').toString('utf-8')
        const [correo, contrasena] = credencialesDecodificadas.split(":")
        const inicioDeSesion: InicioDeSesionDto = {
            correo: correo,
            contrasena: contrasena
        }
        const token = await this.usuarioRdn.obtnerTokenAsync(inicioDeSesion)
        if(token){
            return  res.status(200).json(token)
        }

        return res.status(401).json({message: "Credenciales incorrectas"})
    }
}