"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRdn = void 0;
const producto_repositorio_1 = require("../repositorios/producto.repositorio");
class ProductoRdn {
    async agregarAsync(producto) {
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
                precio: item.precio
            });
        });
        return dtos;
    }
}
exports.ProductoRdn = ProductoRdn;
