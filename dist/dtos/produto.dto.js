"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoDtoIn = exports.productoChecks = void 0;
const express_validator_1 = require("express-validator");
const ayudante_1 = require("../ayudantes/ayudante");
exports.productoChecks = [
    (0, express_validator_1.check)('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser texto')
        .trim(),
    (0, express_validator_1.check)('categoriaId')
        .notEmpty()
        .withMessage('La categoriaId es obligatorio'),
    (0, express_validator_1.check)('imagen')
        .notEmpty()
        .withMessage('La imagen es obligatorio'),
    (0, express_validator_1.check)('descripcion')
        .notEmpty()
        .withMessage('La descripcion es obligatoria')
        .isString()
        .withMessage('La descripcion debe ser texto')
        .trim(),
    (0, express_validator_1.check)('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .bail()
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor que 0'),
];
class ProductoDtoIn {
    constructor(body) {
        this.nombre = body.nombre;
        this.descripcion = body.descripcion;
        this.precio = body.precio;
        this.categoriaId = body.categoriaId;
        this.encodedkey = body.encodedkey || (0, ayudante_1.generarGuid)();
    }
}
exports.ProductoDtoIn = ProductoDtoIn;
