import { check } from "express-validator";
import { generarGuid } from "../ayudantes/ayudante";
import { ProductoDto } from "./produto.dto";

export class OrdenDtoIn {
    productos: OrdenConDetalleDto[]
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

export interface OrdenConDetalleDto {
    productoId: number
    nota: string
}

export const estadosDeOrden = ["ordenRegistrada", "enPreparacion", "enCamino", "entregado", "cancelado"]

export const ordenConDetalleChecks = [
    check('productoId')
        .notEmpty()
        .withMessage('El productoId es obligatorio')
]

export const ordenChecks = [
check('encodedkey')
		.notEmpty()
		.withMessage('El encodedkey es obligatorio')
		.isString()
		.withMessage('El encodedkey debe ser texto')
		.trim(),
	check('productos')
		.notEmpty()
		.withMessage('Los productos es obligatorio'),
];