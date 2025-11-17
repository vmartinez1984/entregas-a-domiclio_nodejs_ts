import express, { Response, Request } from "express";
import conectarDB from "./repositorios/conexionDb";
import router from "./rutas/catetoria.router";
import productoRouter from "./rutas/producto.router";

const app = express();
app.use(express.json());
conectarDB();


app.use("/api", router)
app.use("/api", productoRouter)

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hola mundo entregas a domicilio" });
});

const port = 3001;
app.listen(port, () => {
  console.log("http://localhost:" + port);
  console.log("It's alive");
});
