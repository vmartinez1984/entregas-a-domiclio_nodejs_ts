"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conexionDb_1 = __importDefault(require("./repositorios/conexionDb"));
const catetoria_router_1 = __importDefault(require("./rutas/catetoria.router"));
const producto_router_1 = __importDefault(require("./rutas/producto.router"));
const usuario_ruta_1 = __importDefault(require("./rutas/usuario.ruta"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, conexionDb_1.default)();
app.use("/api", catetoria_router_1.default);
app.use("/api", producto_router_1.default);
app.use("/api", usuario_ruta_1.default);
app.use("/", (req, res) => {
    res.status(200).json({ message: "Hola mundo entregas a domicilio" });
});
const port = 3001;
app.listen(port, () => {
    console.log("http://localhost:" + port);
    console.log("It's alive");
});
