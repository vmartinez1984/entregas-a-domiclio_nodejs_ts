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
            const categoriaExistente = await this.categoriaRdn.obtenerPorIdAsync(categoria.encodedkey);
            if (categoriaExistente) {
                return res.status(208).json({ mensaje: 'La categoría ya existe' });
            }
            const idDto = await this.categoriaRdn.agregarAsync(categoria);
            return res.status(201).json(idDto);
        };
        this.obtenerTodosAsync = async (req, res) => {
            const dtos = await this.categoriaRdn.obtenerTodosAsync();
            res.status(200).json(dtos);
        };
        this.actualizarAsync = async (req, res) => {
            const idEncodedkey = req.params.idEncodedkey;
            const categoria = await this.categoriaRdn.obtenerPorIdAsync(idEncodedkey);
            if (!categoria) {
                return res.status(404).json({ mensaje: 'Categoría no encontrada' });
            }
            categoria.nombre = req.body.nombre;
            await this.categoriaRdn.actualizarAsync(categoria);
            return res.status(202).json({ mensaje: 'Categoría actualizada' });
        };
        this.borrarAsync = async (req, res) => {
            const idEncodedkey = req.params.idEncodedkey;
            const categoria = await this.categoriaRdn.obtenerPorIdAsync(idEncodedkey);
            if (!categoria) {
                return res.status(404).json({ mensaje: 'Categoría no encontrada' });
            }
            await this.categoriaRdn.borrarAsync(categoria);
            return res.status(202).json({ mensaje: 'Categoría borrarda' });
        };
        this.categoriaRdn = new categoria_rdn_1.CategoriaRdn();
    }
}
exports.CategoriaController = CategoriaController;
