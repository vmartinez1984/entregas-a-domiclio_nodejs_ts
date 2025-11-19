"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicioDeSesionDto = void 0;
class InicioDeSesionDto {
    constructor(body) {
        this.correo = body.correo;
        this.contrasena = body.contrasena;
    }
}
exports.InicioDeSesionDto = InicioDeSesionDto;
