"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaChecks = void 0;
const express_validator_1 = require("express-validator");
exports.categoriaChecks = [
    (0, express_validator_1.check)('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser texto')
        .trim(),
];
