import { isNumberString } from "../ayudantes/ayudante";
import { CategoriaDto, CategoriaDtoIn } from "../dtos/categoria.dto";
import { IdDto } from "../dtos/id.dto"
import { CategoriaRepositorio } from "../repositorios/categoria.repositorio";

export class CategoriaRdn {

    async obtenerPorIdAsync(idEncodedkey: string) {
        if (isNumberString(idEncodedkey)) {
            return await CategoriaRepositorio.findOne({ id: Number(idEncodedkey) })
        }

        return await CategoriaRepositorio.findOne({ encodedkey: idEncodedkey })
    }

    async agregarAsync(categoria: CategoriaDtoIn): Promise<IdDto> {

        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await CategoriaRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;

        const documento = new CategoriaRepositorio({
            id: nuevoId,
            nombre: categoria.nombre,
            encodedkey: categoria.encodedkey,
            estaActivo: true,
        });

        await documento.save();
        const idDto: IdDto = {
            encodedkey: categoria.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };

        return idDto
    }

    async obtenerTodosAsync(): Promise<CategoriaDto[]> {
        const categorias = await CategoriaRepositorio.find({ estaActivo: true });
        let dtos: CategoriaDto[] = [];
        categorias.forEach((item) => {
            dtos.push({
                encodedkey: item.encodedkey,
                id: item.id,
                nombre: item.nombre,
            });
        });

        return dtos
    }

    async actualizarAsync(categoria: CategoriaDto): Promise<void> {
        await CategoriaRepositorio.updateOne(
            { encodedkey: categoria.encodedkey },
            {
                $set: {
                    nombre: categoria.nombre
                },
            }
        );
    }

    async borrarAsync(categoria: CategoriaDto): Promise<void> {
        await CategoriaRepositorio.updateOne(
            { encodedkey: categoria.encodedkey },
            {
                $set: {
                    estaActivo: false
                },
            }
        );
    }

}