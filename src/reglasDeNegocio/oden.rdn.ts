import { IdDto } from "../dtos/id.dto"
import { OrdenDto, OrdenDtoIn } from "../dtos/orden.dto"
import { OrdenRepositorio } from "../repositorios/orden.repositorio"
import { UsuarioRepositorio } from "../repositorios/usuario.repositorio";

export class OrdenRdn {
    async obtenerPorIdAsync(encodedkey: string): Promise<OrdenDto | undefined> {
        const orden = await OrdenRepositorio.findOne({ encodedkey: encodedkey })
        if (!orden) {
            return undefined
        }
        const dto: OrdenDto = {
            productos: orden.productos,
            encodedkey: orden.encodedkey,
            id: orden.id,
            usuarioId: orden.clienteId,
            total: orden.total,
            estado: orden.estado,
            fechaDeCreacion: orden.fechaDeCreacion,
            fechaDeActualizacion: orden.fechaDeActualizacion
        }

        return dto
    }


    async agregarAsync(clienteId: string, orden: OrdenDtoIn): Promise<IdDto> {
        // Simular id autoincrementable: buscar el mayor id actual y sumar 1
        const ultimo = await OrdenRepositorio.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        const nuevoId = ultimo && typeof ultimo.id === "number" ? ultimo.id + 1 : 1;
        const total = orden.productos.reduce((sum, item) => sum + item.precio, 0)
        const usuario = await UsuarioRepositorio.findOne({ encodedkey: clienteId })
        const documento = new OrdenRepositorio({
            id: nuevoId,
            clienteId: usuario?.id,
            clienteEncodedkey: clienteId,
            productos: orden.productos,
            total: total,
            fechaDeCreacion: new Date(),
            estado: "Orden recibida",
            fechaDeActualizacion: new Date(),
            encodedkey: orden.encodedkey
        });
        console.log("documento orden", documento)

        await documento.save();

        const idDto: IdDto = {
            encodedkey: orden.encodedkey,
            id: nuevoId,
            fecha: new Date(),
        };

        return idDto
    }
}