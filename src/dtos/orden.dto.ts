import { generarGuid } from "../ayudantes/ayudante";
import { ProductoDto } from "./produto.dto";

export class OrdenDtoIn {
    productos: ProductoDto[]
    //usuarioId: number
    encodedkey: string

    constructor(body: any) {
        this.productos = body.productos
        //this.usuarioId = body.usuarioId
        this.encodedkey = body.encodedkey || generarGuid()
    }
}

export interface OrdenDto {
    id: number
    productos: ProductoDto[]
    usuarioId: number
    encodedkey: string,
    fechaDeCreacion: Date
    fechaDeActualizacion: Date
    estado: string
    total: number
}