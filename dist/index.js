"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conexionDb_1 = __importDefault(require("./repositorios/conexionDb"));
const catetoria_router_1 = __importDefault(require("./rutas/catetoria.router"));
const producto_router_1 = __importDefault(require("./rutas/producto.router"));
const cliente_ruta_1 = __importDefault(require("./rutas/cliente.ruta"));
const orden_ruta_1 = __importDefault(require("./rutas/orden.ruta"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, conexionDb_1.default)();
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    useTempFiles: false,
}));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "..", "public")));
/*
curl --location 'http://localhost:3001/images/16fa6b62-cd53-45d6-a238-e1673a7420ca.jpg'
*/
app.use("/api", catetoria_router_1.default);
app.use("/api", producto_router_1.default);
app.use("/api", cliente_ruta_1.default);
app.use("/api", orden_ruta_1.default);
app.use("/", (req, res) => {
    res.status(200).json({ message: "Hola mundo entregas a domicilio" });
});
const port = 3001;
app.listen(port, () => {
    console.log("http://localhost:" + port);
    console.log("It's alive");
});
