import path from "path";
import { AlmacenDeArchivos } from "../almacenes/almacen-de-archivos";
import { IdDto } from "../dtos/id.dto";
import { ProductoDto, ProductoDtoIn } from "../dtos/produto.dto";
import { ProductoRepositorio } from "../repositorios/producto.repositorio";

export class ProductoRdn {
    
    async obtenerPorEncodedKeyAsync(encodedkey: string): Promise<ProductoDto | null> {
        const producto = await ProductoRepositorio.findOne({ encodedkey: encodedkey })
        if (!producto) {
            return null
        }
        const dto: ProductoDto = {
            encodedkey: producto.encodedkey,
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            nombreDeLaImagen: producto.nombreDeLaImagen
        }
        return dto
    }

    async obtenerPorCategoriaIdAsync(categoriaId: string): Promise<ProductoDto[]> {
        const productos = await ProductoRepositorio.find({ categoriaId: categoriaId })
        let dtos: ProductoDto[] = []
        productos.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                nombreDeLaImagen: item.nombreDeLaImagen
            });
        });

        return dtos
    }

    async agregarAsync(producto: ProductoDtoIn, archivo: any): Promise<IdDto> {
        let nombreDeLaImagen = ''
        let rutaDeLaImagen = ''
        if (archivo) {
            let almacenDeArchivos: AlmacenDeArchivos = new AlmacenDeArchivos()
            nombreDeLaImagen = `${producto.encodedkey}${path.extname(archivo.name).toLowerCase()}`
            rutaDeLaImagen = await almacenDeArchivos.guardarArchivoAsync(nombreDeLaImagen, archivo.data)
        }
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await ProductoRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;

        const documento = new ProductoRepositorio({
            id: nuevoId,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            encodedkey: producto.encodedkey,
            precio: producto.precio,
            categoriaId: producto.categoriaId,
            nombreDeLaImagen: nombreDeLaImagen,
            rutaDeLaImagen: rutaDeLaImagen,
            fecha: new Date(),
            estaActivo: true
        });
        await documento.save();

        const idDto: IdDto = {
            encodedkey: producto.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };

        return idDto
    }

    async obtenerTodosAsync(): Promise<ProductoDto[]> {
        const productos = await ProductoRepositorio.find()
        let dtos: ProductoDto[] = []
        productos.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                nombreDeLaImagen: item.nombreDeLaImagen,
            });
        });

        return dtos
    }
}