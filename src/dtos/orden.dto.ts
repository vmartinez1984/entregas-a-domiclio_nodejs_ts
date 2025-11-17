import { ProductoDto } from "./produto.dto";

export class OrdenDtoIn {
    productos: ProductoDto[]
    usuarioId: number

    constructor(body: any) {
        this.productos = body.productos
        this.usuarioId = body.usuarioId
    }
}
