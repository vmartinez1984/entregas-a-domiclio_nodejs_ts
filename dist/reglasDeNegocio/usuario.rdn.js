"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRdn = void 0;
const usuario_repositorio_1 = require("../repositorios/usuario.repositorio");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo";
class UsuarioRdn {
    async obtenerPorIdAsync(encodedkey) {
        const usuario = await usuario_repositorio_1.UsuarioRepositorio.findOne({ encodedkey: encodedkey });
        if (usuario === null) {
            return null;
        }
        const usuarioDto = {
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
        };
        return usuarioDto;
    }
    async agregarAsync(usuario) {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await usuario_repositorio_1.UsuarioRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;
        //console.log(usuario)
        const documento = new usuario_repositorio_1.UsuarioRepositorio({
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
        });
        await documento.save();
        const idDto = {
            encodedkey: usuario.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };
        return idDto;
    }
    async obtnerTokenAsync(inicioDeSesion) {
        const usuario = await usuario_repositorio_1.UsuarioRepositorio.findOne({ correo: inicioDeSesion.correo });
        if (usuario == undefined)
            return undefined;
        if (usuario.contrasena != inicioDeSesion.contrasena)
            return undefined;
        const payload = {
            nombre: usuario.nombre,
            encodedkey: usuario.encodedkey
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "20m" });
        const tokenDto = {
            token,
            expiracion: new Date(new Date().getTime() + 20 * 60000)
        };
        return tokenDto;
    }
}
exports.UsuarioRdn = UsuarioRdn;
