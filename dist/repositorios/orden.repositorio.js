"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenRepositorio = void 0;
const mongoose_1 = require("mongoose");
const OrdenSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    encodedkey: { type: String, required: true },
    clienteId: { type: Number, required: true },
    clienteEncodedkey: { type: String, required: true },
    fechaDeCreacion: { type: Date, required: true },
    estado: { type: String, required: true },
    total: { type: Number, required: true },
    fechaDeActualizacion: { type: Date, required: true },
    productos: { type: Array, required: true },
}, { timestamps: true });
exports.OrdenRepositorio = (0, mongoose_1.model)('Ordenes', OrdenSchema);
