import { check } from "express-validator"

export interface CategoriaDtoIn{
    encodedkey:string
    nombre:string
}

export interface CategoriaDto{
    id:number
    encodedkey:string
    nombre:string
}

export const categoriaChecks = [
    check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser texto')
        .trim(),
];