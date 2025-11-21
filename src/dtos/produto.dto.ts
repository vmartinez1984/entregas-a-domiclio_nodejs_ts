import { check } from 'express-validator'
import { generarGuid } from '../ayudantes/ayudante'

export const productoChecks = [
	check('nombre')
		.notEmpty()
		.withMessage('El nombre es obligatorio')
		.isString()
		.withMessage('El nombre debe ser texto')
		.trim(),
	check('categoriaId')
		.notEmpty()
		.withMessage('La categoriaId es obligatorio'),
	check('imagen')
		.notEmpty()
		.withMessage('La imagen es obligatorio'),
	check('descripcion')
		.notEmpty()
		.withMessage('La descripcion es obligatoria')
		.isString()
		.withMessage('La descripcion debe ser texto')
		.trim(),
	check('precio')
		.notEmpty()
		.withMessage('El precio es obligatorio')
		.bail()
		.isFloat({ gt: 0 })
		.withMessage('El precio debe ser un número mayor que 0'),
];

export class ProductoDtoIn {
	nombre: string
	descripcion: string
	precio: number
	encodedkey: any
	categoriaId: number

	constructor(body: any) {
		this.nombre = body.nombre
		this.descripcion = body.descripcion
		this.precio = body.precio
		this.categoriaId = body.categoriaId
		this.encodedkey = body.encodedkey || generarGuid()
	}
}

export interface ProductoDto {
	id: number
	nombre: string
	descripcion: string
	precio: number
	encodedkey: string,
	nombreDeLaImagen: string
}