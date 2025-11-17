import { validationResult } from 'express-validator';
import { ProductoDtoIn } from '../dtos/produto.dto';
import { ProductoRdn } from '../reglasDeNegocio/producto.rdn';

export class ProductosController {
    private productoRdn: ProductoRdn

    constructor() {
        this.productoRdn = new ProductoRdn()
    }

    agregarAsync = async (req: Request, res: Response) => {
        const producto: ProductoDtoIn = new ProductoDtoIn(req.body)
        const idDto = await this.productoRdn.agregarAsync(producto)

        return res.status(201).json(idDto);
    }

    obtenerTodosAsync = async (req: Request, res: Response) => {
        const productos = await this.productoRdn.obtenerTodosAsync()

        return res.status(200).json(productos);
    }

}