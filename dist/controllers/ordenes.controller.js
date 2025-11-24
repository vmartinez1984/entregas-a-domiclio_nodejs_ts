"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesController = void 0;
const orden_dto_1 = require("../dtos/orden.dto");
const orden_rdn_1 = require("../reglasDeNegocio/orden.rdn");
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
        this.obtenerPorId = async (req, res) => {
            const encodedkey = req.params.encodedkey;
            const orden = await this.ordenRdn.obtenerPorIdAsync(encodedkey);
            if (!orden) {
                return res.status(404).json({ message: "Orden no encontrada" });
            }
            return res.status(200).json(orden);
        };
        this.ordenRdn = new orden_rdn_1.OrdenRdn();
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
