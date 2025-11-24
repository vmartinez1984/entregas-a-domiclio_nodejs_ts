"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosController = void 0;
const produto_dto_1 = require("../dtos/produto.dto");
const producto_rdn_1 = require("../reglasDeNegocio/producto.rdn");
class ProductosController {
    constructor() {
        this.agregarAsync = async (req, res) => {
            const producto = new produto_dto_1.ProductoDtoIn(req.body);
            const productoRegsitrado = await this.productoRdn.obtenerPorEncodedKeyAsync(producto.encodedkey);
            if (productoRegsitrado) {
                return res.status(208).json({
                    encodedkey: productoRegsitrado.encodedkey,
                    id: productoRegsitrado.id,
                    fecha: new Date(),
                });
            }
            var archivo = req.files?.imagen;
            //console.log(archivo);
            // Aquí podrías guardar el archivo en el servidor o en un servicio de almacenamiento
            const idDto = await this.productoRdn.agregarAsync(producto, archivo);
            return res.status(201).json(idDto);
        };
        this.obtenerTodosAsync = async (req, res) => {
            const productos = await this.productoRdn.obtenerTodosAsync();
            return res.status(200).json(productos);
        };
        this.obtenerPorCategoriaIdAsync = async (req, res) => {
            const categoriaId = req.params.categoriaId;
            const productos = await this.productoRdn.obtenerPorCategoriaIdAsync(categoriaId);
            return res.status(200).json(productos);
        };
        this.productoRdn = new producto_rdn_1.ProductoRdn();
    }
}
exports.ProductosController = ProductosController;
