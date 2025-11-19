"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const ayudante_1 = require("../ayudantes/ayudante");
const categoria_rdn_1 = require("../reglasDeNegocio/categoria.rdn");
class CategoriaController {
    constructor() {
        this.agregarAsync = async (req, res) => {
            const categoria = {
                encodedkey: req.body.encodedkey || (0, ayudante_1.generarGuid)(),
                nombre: req.body.nombre,
            };
            const idDto = await this.categoriaRdn.agregarAsync(categoria);
            return res.status(201).json(idDto);
        };
        this.obtenerTodosAsync = async (req, res) => {
            const dtos = await this.categoriaRdn.obtenerTodosAsync();
            res.status(200).json(dtos);
        };
        this.categoriaRdn = new categoria_rdn_1.CategoriaRdn();
    }
}
exports.CategoriaController = CategoriaController;
