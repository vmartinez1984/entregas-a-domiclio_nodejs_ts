import express, { Response, Request } from "express"
import conectarDB from "./repositorios/conexionDb"
import router from "./rutas/catetoria.router"
import productoRouter from "./rutas/producto.router"
import clienteRouter from "./rutas/cliente.ruta"
import ordenRouter from "./rutas/orden.ruta"
import fileUpload from 'express-fileupload';
import path from "path"

const app = express();
app.use(express.json());
conectarDB();

app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  useTempFiles: false,
}));
app.use("/", express.static(path.join(__dirname, "..", "public")))
/*
curl --location 'http://localhost:3001/images/16fa6b62-cd53-45d6-a238-e1673a7420ca.jpg'
*/

app.use("/api", router)
app.use("/api", productoRouter)
app.use("/api", clienteRouter)
app.use("/api", ordenRouter)

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hola mundo entregas a domicilio" });
});

const port = 3001;
app.listen(port, () => {
  console.log("http://localhost:" + port);
  console.log("It's alive");
});