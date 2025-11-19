"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepositorio = void 0;
const mongoose_1 = require("mongoose");
const CategoriaSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true }
}, { timestamps: true });
exports.CategoriaRepositorio = (0, mongoose_1.model)('Categorias', CategoriaSchema);
