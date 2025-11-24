"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepositorio = void 0;
const mongoose_1 = require("mongoose");
const ClienteSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    direccion: {
        calle: { type: String, required: true },
        referencia: { type: String, required: true },
        ciudad: { type: String, required: true },
        colonia: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true },
    fecha: { type: Date, required: true }
}, { timestamps: true });
exports.ClienteRepositorio = (0, mongoose_1.model)('Clientes', ClienteSchema);
