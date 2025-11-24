"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRdn = void 0;
const path_1 = __importDefault(require("path"));
const almacen_de_archivos_1 = require("../almacenes/almacen-de-archivos");
const producto_repositorio_1 = require("../repositorios/producto.repositorio");
class ProductoRdn {
    async obtenerPorEncodedKeyAsync(encodedkey) {
        const producto = await producto_repositorio_1.ProductoRepositorio.findOne({ encodedkey: encodedkey });
        if (!producto) {
            return null;
        }
        const dto = {
            encodedkey: producto.encodedkey,
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            nombreDeLaImagen: producto.nombreDeLaImagen
        };
        return dto;
    }
    async obtenerPorCategoriaIdAsync(categoriaId) {
        const productos = await producto_repositorio_1.ProductoRepositorio.find({ categoriaId: categoriaId });
        let dtos = [];
        productos.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                nombreDeLaImagen: item.nombreDeLaImagen
            });
        });
        return dtos;
    }
    async agregarAsync(producto, archivo) {
        let nombreDeLaImagen = '';
        let rutaDeLaImagen = '';
        if (archivo) {
            let almacenDeArchivos = new almacen_de_archivos_1.AlmacenDeArchivos();
            nombreDeLaImagen = `${producto.encodedkey}${path_1.default.extname(archivo.name).toLowerCase()}`;
            rutaDeLaImagen = await almacenDeArchivos.guardarArchivoAsync(nombreDeLaImagen, archivo.data);
        }
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await producto_repositorio_1.ProductoRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;
        const documento = new producto_repositorio_1.ProductoRepositorio({
            id: nuevoId,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            encodedkey: producto.encodedkey,
            precio: producto.precio,
            categoriaId: producto.categoriaId,
            nombreDeLaImagen: nombreDeLaImagen,
            rutaDeLaImagen: rutaDeLaImagen,
            fecha: new Date(),
            estaActivo: true
        });
        await documento.save();
        const idDto = {
            encodedkey: producto.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };
        return idDto;
    }
    async obtenerTodosAsync() {
        const productos = await producto_repositorio_1.ProductoRepositorio.find();
        let dtos = [];
        productos.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                nombreDeLaImagen: item.nombreDeLaImagen,
            });
        });
        return dtos;
    }
}
exports.ProductoRdn = ProductoRdn;
