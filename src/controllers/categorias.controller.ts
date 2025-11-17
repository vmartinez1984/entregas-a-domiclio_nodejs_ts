import { CategoriaDtoIn } from "../dtos/categoria.dto";
import { IdDto } from "../dtos/id.dto";
import { CategoriaRepositorio } from "../repositorios/categoria.repositorio";

export class CategoriaController{

    async agregarAsync(categoria: CategoriaDtoIn):Promise<IdDto> {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await CategoriaRepositorio.findOne().sort({ id: -1 }).limit(1).lean();
        const nuevoId = (ultimo && typeof ultimo.id === 'number') ? ultimo.id + 1 : 1;

        // Crear encodedkey simple (por ejemplo, base64 del nombre + id)
        const encodedkey = Buffer.from(`${categoria.nombre}-${nuevoId}`).toString('base64');

        const documento = new CategoriaRepositorio({
            id: nuevoId,
            nombre: categoria.nombre,
            encodedkey: categoria.encodedkey,
            estaActivo: true
        });

        await documento.save();

        return { id: nuevoId } as IdDto;
    }
}