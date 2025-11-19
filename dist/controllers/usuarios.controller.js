"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const usuario_rdn_1 = require("../reglasDeNegocio/usuario.rdn");
const usuario_dto_1 = require("../dtos/usuario.dto");
class UsuariosController {
    constructor() {
        this.agregarAsync = async (req, res) => {
            //console.log(req.body)
            const usuario = new usuario_dto_1.UsuarioDtoIn(req.body);
            const usuarioregistrado = await this.usuarioRdn.obtenerPorIdAsync(usuario.encodedkey);
            if (usuarioregistrado) {
                const idDto = {
                    encodedkey: usuario.encodedkey,
                    id: usuarioregistrado.id,
                    fecha: new Date()
                };
                return res.status(208).json(idDto);
            }
            //console.log(usuario)       
            const idDto = await this.usuarioRdn.agregarAsync(usuario);
            return res.status(201).json(idDto);
        };
        this.iniciarSesionAsync = async (req, res) => {
            const inicioDeSesion = {
                correo: req.body.correo,
                contrasena: req.body.contrasena
            };
            const token = await this.usuarioRdn.obtnerTokenAsync(inicioDeSesion);
            if (token) {
                return res.status(200).json(token);
            }
            return res.status(401).json({ message: "Credenciales incorrectas" });
        };
        this.usuarioRdn = new usuario_rdn_1.UsuarioRdn();
    }
}
exports.UsuariosController = UsuariosController;
