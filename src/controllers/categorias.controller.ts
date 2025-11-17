import { Request } from "express";
import { CategoriaDtoIn } from "../dtos/categoria.dto";
import { generarGuid } from "../ayudantes/ayudante";
import { CategoriaRdn } from "../reglasDeNegocio/categoria.rdn";

export class CategoriaController {
  private categoriaRdn: CategoriaRdn

  constructor() {
    this.categoriaRdn = new CategoriaRdn()
  }

  agregarAsync = async (req: Request, res: Response) => {
    const categoria: CategoriaDtoIn = {
      encodedkey: req.body.encodedkey || generarGuid(),
      nombre: req.body.nombre,
    };
    const idDto = await this.categoriaRdn.agregarAsync(categoria)
    return res.status(201).json(idDto);
  };

  obtenerTodosAsync = async (req: Request, res: Response) => {
    const dtos = await this.categoriaRdn.obtenerTodosAsync()

    res.status(200).json(dtos)
  };
}
