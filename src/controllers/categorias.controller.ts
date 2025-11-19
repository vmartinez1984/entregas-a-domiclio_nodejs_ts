import { Request, Response } from "express"
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
    const categoriaExistente = await this.categoriaRdn.obtenerPorIdAsync(categoria.encodedkey)
    if (categoriaExistente) {
      return res.status(208).json({ mensaje: 'La categoría ya existe' })
    }
    const idDto = await this.categoriaRdn.agregarAsync(categoria)
    
    return res.status(201).json(idDto);
  };

  obtenerTodosAsync = async (req: Request, res: Response) => {
    const dtos = await this.categoriaRdn.obtenerTodosAsync()

    res.status(200).json(dtos)
  };

  actualizarAsync = async (req: Request, res: Response) => {
    const idEncodedkey = req.params.idEncodedkey
    const categoria = await this.categoriaRdn.obtenerPorIdAsync(idEncodedkey)
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' })
    }
    categoria.nombre = req.body.nombre
    await this.categoriaRdn.actualizarAsync(categoria)

    return res.status(202).json({mensaje: 'Categoría actualizada'})
  }

  borrarAsync = async (req: Request, res: Response) => {
    const idEncodedkey = req.params.idEncodedkey
    const categoria = await this.categoriaRdn.obtenerPorIdAsync(idEncodedkey)
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' })
    }
    
    await this.categoriaRdn.borrarAsync(categoria)

    return res.status(202).json({mensaje: 'Categoría borrarda'})
  }
}