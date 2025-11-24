"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenChecks = exports.ordenConDetalleChecks = exports.estadosDeOrden = exports.OrdenDtoIn = void 0;
const express_validator_1 = require("express-validator");
const ayudante_1 = require("../ayudantes/ayudante");
class OrdenDtoIn {
    constructor(body) {
        this.productos = body.productos;
        //this.usuarioId = body.usuarioId
        this.encodedkey = body.encodedkey || (0, ayudante_1.generarGuid)();
    }
}
exports.OrdenDtoIn = OrdenDtoIn;
exports.estadosDeOrden = ["ordenRegistrada", "enPreparacion", "enCamino", "entregado", "cancelado"];
exports.ordenConDetalleChecks = [
    (0, express_validator_1.check)('productoId')
        .notEmpty()
        .withMessage('El productoId es obligatorio')
];
exports.ordenChecks = [
    (0, express_validator_1.check)('encodedkey')
        .notEmpty()
        .withMessage('El encodedkey es obligatorio')
        .isString()
        .withMessage('El encodedkey debe ser texto')
        .trim(),
    (0, express_validator_1.check)('productos')
        .notEmpty()
        .withMessage('Los productos es obligatorio'),
];
