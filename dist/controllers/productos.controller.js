"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosController = void 0;
const produto_dto_1 = require("../dtos/produto.dto");
const producto_rdn_1 = require("../reglasDeNegocio/producto.rdn");
class ProductosController {
    constructor() {
        this.agregarAsync = async (req, res) => {
            const producto = new produto_dto_1.ProductoDtoIn(req.body);
            const idDto = await this.productoRdn.agregarAsync(producto);
            return res.status(201).json(idDto);
        };
        this.obtenerTodosAsync = async (req, res) => {
            const productos = await this.productoRdn.obtenerTodosAsync();
            return res.status(200).json(productos);
        };
        this.productoRdn = new producto_rdn_1.ProductoRdn();
    }
}
exports.ProductosController = ProductosController;
