"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo";
async function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        console.log("payload", payload);
        //(req as any).user = payload
        //req.body.clienteId = (payload as any).encodedkey
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}
