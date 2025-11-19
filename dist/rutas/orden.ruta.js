"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenes_controller_1 = require("../controllers/ordenes.controller");
const token_middleware_1 = require("../middlewares/token.middleware");
const ordenRouter = (0, express_1.Router)();
const controller = new ordenes_controller_1.OrdenesController();
ordenRouter.post('/ordenes', token_middleware_1.verifyToken, controller.agregarAsync);
exports.default = ordenRouter;
