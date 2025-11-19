"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRdn = void 0;
const categoria_repositorio_1 = require("../repositorios/categoria.repositorio");
class CategoriaRdn {
    async agregarAsync(categoria) {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await categoria_repositorio_1.CategoriaRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;
        const documento = new categoria_repositorio_1.CategoriaRepositorio({
            id: nuevoId,
            nombre: categoria.nombre,
            encodedkey: categoria.encodedkey,
            estaActivo: true,
        });
        await documento.save();
        const idDto = {
            encodedkey: categoria.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };
        return idDto;
    }
    async obtenerTodosAsync() {
        const categorias = await categoria_repositorio_1.CategoriaRepositorio.find();
        let dtos = [];
        categorias.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
            });
        });
        return dtos;
    }
}
exports.CategoriaRdn = CategoriaRdn;
