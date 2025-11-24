import { Request, Response } from "express"
import { UploadedFile } from 'express-fileupload'
import { ProductoDtoIn } from '../dtos/produto.dto'
import { ProductoRdn } from '../reglasDeNegocio/producto.rdn'
import { console } from "inspector"

export class ProductosController {
    private productoRdn: ProductoRdn

    constructor() {
        this.productoRdn = new ProductoRdn()
    }

    agregarAsync = async (req: Request, res: Response) => {
        const producto: ProductoDtoIn = new ProductoDtoIn(req.body)
        console.log(producto)
        const productoRegsitrado = await this.productoRdn.obtenerPorEncodedKeyAsync(producto.encodedkey)
        if (productoRegsitrado) {
            return res.status(208).json({
                encodedkey: productoRegsitrado.encodedkey,
                id: productoRegsitrado.id,
                fecha: new Date(),
            })
        }
        var archivo = req.files?.imagen as UploadedFile
        //console.log(archivo);
        // Aquí podrías guardar el archivo en el servidor o en un servicio de almacenamiento
        const idDto = await this.productoRdn.agregarAsync(producto, archivo);
        return res.status(201).json(idDto);
    }

    actualizarAsync = async (req: Request, res: Response) => {
        // Lógica para actualizar un producto
        const productoId = req.params.productoId
        const producto: ProductoDtoIn = new ProductoDtoIn(req.body)
        const productoRegsitrado = await this.productoRdn.obtenerPorEncodedKeyAsync(productoId)
        if (!productoRegsitrado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        var archivo = req.files?.imagen as UploadedFile
        //console.log(archivo);
        // Aquí podrías guardar el archivo en el servidor o en un servicio de almacenamiento
        const idDto = await this.productoRdn.actualizarAsync(productoId, producto, archivo);
        return res.status(202).json(idDto);
    }

    obtenerTodosAsync = async (req: Request, res: Response) => {
        const productos = await this.productoRdn.obtenerTodosAsync()

        return res.status(200).json(productos);
    }

    obtenerPorCategoriaIdAsync = async (req: Request, res: Response) => {
        const categoriaId = req.params.categoriaId
        const productos = await this.productoRdn.obtenerPorCategoriaIdAsync(categoriaId)

        return res.status(200).json(productos)
    }
}