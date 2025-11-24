"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacenDeArchivos = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class AlmacenDeArchivos {
    async guardarArchivoAsync(nombre, datos) {
        const ruta = `${path_1.default.join(__dirname, "..", "..", "public", "images")}/${nombre}`;
        await promises_1.default.writeFile(ruta, datos);
        return ruta;
    }
}
exports.AlmacenDeArchivos = AlmacenDeArchivos;
