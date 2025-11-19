"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesController = void 0;
const orden_dto_1 = require("../dtos/orden.dto");
const oden_rdn_1 = require("../reglasDeNegocio/oden.rdn");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo";
class OrdenesController {
    constructor() {
        this.agregarAsync = async (req, res) => {
            //console.log("req.body", req.body)
            const clienteId = obtenerClienteIdDesdeToken(req);
            const orden = new orden_dto_1.OrdenDtoIn(req.body);
            const ordenRegistrada = await this.ordenRdn.obtenerPorIdAsync(orden.encodedkey);
            if (ordenRegistrada) {
                const idDto = {
                    id: ordenRegistrada.id,
                    encodedkey: ordenRegistrada.encodedkey,
                    fecha: new Date()
                };
                return res.status(208).json(idDto);
            }
            const idDto = await this.ordenRdn.agregarAsync(clienteId, orden);
            return res.status(201).json(idDto);
        };
        this.ordenRdn = new oden_rdn_1.OrdenRdn();
    }
}
exports.OrdenesController = OrdenesController;
function obtenerClienteIdDesdeToken(req) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const payload = jsonwebtoken_1.default.verify(token, secret);
    //console.log("payload", payload)
    const clienteId = payload.encodedkey;
    return clienteId;
}
