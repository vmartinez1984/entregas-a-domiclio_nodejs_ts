import { IdDto } from "../dtos/id.dto"
import { InicioDeSesionDto } from "../dtos/inicio-de-sesion.dto";
import { TokenDto } from "../dtos/token.dto";
import { ClienteDtoIn, ClienteDto } from "../dtos/cliente.dto";
import { ClienteRepositorio } from "../repositorios/cliente.repositorio";
import jwt from "jsonwebtoken"
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo"

export class ClienteRdn {

    async obtenerPorIdAsync(encodedkey: string): Promise<ClienteDto | null> {
        const usuario = await ClienteRepositorio.findOne({ encodedkey: encodedkey })
        if (usuario === null) {
            return null
        }
        const usuarioDto: ClienteDto = {
            id: usuario.id,
            encodedkey: usuario.encodedkey,
            nombre: usuario.nombre,
            correo: usuario.correo,
            direccion: {
                calle: usuario.direccion.calle,
                referencia: usuario.direccion.referencia,
                ciudad: usuario.direccion.ciudad,
                codigoPostal: usuario.direccion.codigoPostal,
                colonia: usuario.direccion.colonia
            }
        }

        return usuarioDto
    }

    async agregarAsync(usuario: ClienteDtoIn): Promise<IdDto> {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await ClienteRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean()
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1
        //console.log(usuario)
        const documento = new ClienteRepositorio({
            id: nuevoId,
            nombre: usuario.nombre,
            correo: usuario.correo,
            contrasena: usuario.contrasena,
            direccion: {
                calle: usuario.direccion.calle,
                referencia: usuario.direccion.referencia,
                ciudad: usuario.direccion.ciudad,
                colonia: usuario.direccion.colonia,
                codigoPostal: usuario.direccion.codigoPostal
            },
            encodedkey: usuario.encodedkey,
            fecha: new Date(),
            estaActivo: true
        })
        await documento.save()

        const idDto: IdDto = {
            encodedkey: usuario.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        }

        return idDto
    }

    async obtnerTokenAsync(inicioDeSesion: InicioDeSesionDto): Promise<TokenDto | undefined> {
        const usuario = await ClienteRepositorio.findOne({ correo: inicioDeSesion.correo })
        if (usuario == undefined)
            return undefined
        if (usuario.contrasena != inicioDeSesion.contrasena)
            return undefined
        const payload = {
            nombre: usuario.nombre,
            encodedkey: usuario.encodedkey
        }
        const token = jwt.sign(payload, secret, { expiresIn: "20m" })
        const tokenDto: TokenDto = {
            token,
            expiracion: new Date(new Date().getTime() + 20 * 60000)
        }
        
        return tokenDto
    }
}