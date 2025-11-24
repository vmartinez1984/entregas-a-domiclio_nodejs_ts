"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteChecks = exports.DireccionDto = exports.ClienteDtoIn = void 0;
const express_validator_1 = require("express-validator");
const ayudante_1 = require("../ayudantes/ayudante");
class ClienteDtoIn {
    constructor(body) {
        this.encodedkey = body.encodedkey || (0, ayudante_1.generarGuid)();
        this.nombre = body.nombre;
        this.correo = body.correo;
        this.contrasena = body.contrasena;
        this.direccion = new DireccionDto(body.direccion);
    }
}
exports.ClienteDtoIn = ClienteDtoIn;
class DireccionDto {
    constructor(body) {
        this.calle = body.calle;
        this.referencia = body.referencia;
        this.colonia = body.colonia;
        this.ciudad = body.ciudad;
        this.codigoPostal = body.codigoPostal;
    }
}
exports.DireccionDto = DireccionDto;
exports.clienteChecks = [
    (0, express_validator_1.check)('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser texto')
        .trim(),
    (0, express_validator_1.check)('correo')
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo debe tener un formato válido')
        .trim()
        .normalizeEmail(),
    (0, express_validator_1.check)('contrasena')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    (0, express_validator_1.check)('direccion.calle')
        .notEmpty()
        .withMessage('La calle es obligatoria')
        .isString()
        .withMessage('La calle debe ser texto')
        .trim(),
    (0, express_validator_1.check)('direccion.referencia')
        .notEmpty()
        .withMessage('La referencia es obligatoria')
        .isString()
        .withMessage('La referencia debe ser texto')
        .trim(),
    (0, express_validator_1.check)('direccion.colonia')
        .notEmpty()
        .withMessage('La colonia es obligatoria')
        .isString()
        .withMessage('La colonia debe ser texto')
        .trim(),
    (0, express_validator_1.check)('direccion.ciudad')
        .notEmpty()
        .withMessage('La ciudad es obligatoria')
        .isString()
        .withMessage('La ciudad debe ser texto')
        .trim(),
    (0, express_validator_1.check)('direccion.codigoPostal')
        .notEmpty()
        .withMessage('El código postal es obligatorio')
        .isString()
        .withMessage('El código postal debe ser texto')
        .trim()
];
