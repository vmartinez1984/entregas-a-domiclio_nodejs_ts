"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias_controller_1 = require("../controllers/categorias.controller");
const router = (0, express_1.Router)();
const controller = new categorias_controller_1.CategoriaController();
router.post('/categorias', controller.agregarAsync);
router.get('/categorias', controller.obtenerTodosAsync);
exports.default = router;
