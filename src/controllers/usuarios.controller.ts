import { Request, Response } from "express"
import { UsuarioRdn } from "../reglasDeNegocio/usuario.rdn"
import { UsuarioDtoIn } from "../dtos/usuario.dto"
import { IdDto } from "../dtos/id.dto"
import { InicioDeSesionDto } from "../dtos/inicio-de-sesion.dto"

export class UsuariosController {
    private usuarioRdn: UsuarioRdn

    constructor() {
        this.usuarioRdn = new UsuarioRdn()
    }

    agregarAsync = async (req: Request, res: Response) => {
        //console.log(req.body)
        const usuario = new UsuarioDtoIn(req.body)
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
        const inicioDeSesion: InicioDeSesionDto = {
            correo: req.body.correo,
            contrasena: req.body.contrasena
        }
        const token = await this.usuarioRdn.obtnerTokenAsync(inicioDeSesion)
        if(token){
            return  res.status(200).json(token)
        }

        return res.status(401).json({message: "Credenciales incorrectas"})
    }
}