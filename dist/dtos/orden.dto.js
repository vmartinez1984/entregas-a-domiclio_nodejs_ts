"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenDtoIn = void 0;
const ayudante_1 = require("../ayudantes/ayudante");
class OrdenDtoIn {
    constructor(body) {
        this.productos = body.productos;
        //this.usuarioId = body.usuarioId
        this.encodedkey = body.encodedkey || (0, ayudante_1.generarGuid)();
    }
}
exports.OrdenDtoIn = OrdenDtoIn;
