import { IdDto } from "../dtos/id.dto";
import { ProductoDto, ProductoDtoIn } from "../dtos/produto.dto";
import { ProductoRepositorio } from "../repositorios/producto,repositorio";

export class ProductoRdn {

    async agregarAsync(producto: ProductoDtoIn): Promise<IdDto> {
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
                precio: item.precio         
            });
        });

        return dtos
    }
}