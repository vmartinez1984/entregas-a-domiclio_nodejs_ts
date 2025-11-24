"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenRdn = void 0;
const orden_repositorio_1 = require("../repositorios/orden.repositorio");
const cliente_repositorio_1 = require("../repositorios/cliente.repositorio");
class OrdenRdn {
    async obtenerPorIdAsync(encodedkey) {
        const orden = await orden_repositorio_1.OrdenRepositorio.findOne({ encodedkey: encodedkey });
        if (!orden) {
            return undefined;
        }
        const dto = {
            productos: orden.productos,
            encodedkey: orden.encodedkey,
            id: orden.id,
            usuarioId: orden.clienteId,
            total: orden.total,
            estado: orden.estado,
            fechaDeCreacion: orden.fechaDeCreacion,
            fechaDeActualizacion: orden.fechaDeActualizacion
        };
        return dto;
    }
    async agregarAsync(clienteId, orden) {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await orden_repositorio_1.OrdenRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;
        const total = orden.productos.reduce((sum, item) => sum + item.precio, 0);
        const usuario = await cliente_repositorio_1.ClienteRepositorio.findOne({ encodedkey: clienteId });
        const documento = new orden_repositorio_1.OrdenRepositorio({
            id: nuevoId,
            clienteId: usuario?.id,
            clienteEncodedkey: clienteId,
            productos: orden.productos,
            total: total,
            fechaDeCreacion: new Date(),
            estado: "Orden recibida",
            fechaDeActualizacion: new Date(),
            encodedkey: orden.encodedkey
        });
        console.log("documento orden", documento);
        await documento.save();
        const idDto = {
            encodedkey: orden.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };
        return idDto;
    }
}
exports.OrdenRdn = OrdenRdn;
