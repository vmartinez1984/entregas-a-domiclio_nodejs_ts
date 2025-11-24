"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepositorio = void 0;
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    categoriaId: { type: Number, required: true },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true },
    nombreDeLaImagen: { type: String, required: false },
    rutaDeLaImagen: { type: String, required: false }
}, { timestamps: true });
exports.ProductoRepositorio = (0, mongoose_1.model)('Productos', ProductoSchema);
