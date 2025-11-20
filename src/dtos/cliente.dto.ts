import { check } from "express-validator"
import { generarGuid } from "../ayudantes/ayudante"

export class ClienteDtoIn{
    nombre: string
    correo: string
    contrasena: string
    direccion: DireccionDto
    encodedkey: string     

    constructor(body: any){
        this.encodedkey = body.encodedkey || generarGuid()
        this.nombre = body.nombre
        this.correo = body.correo
        this.contrasena = body.contrasena
        this.direccion = new DireccionDto(body.direccion)
    }
}

export class DireccionDto{
    calle: string
    referencia: string
    colonia: string
    ciudad: string    
    codigoPostal: string

    constructor(body: any){
        this.calle = body.calle
        this.referencia = body.referencia
        this.colonia = body.colonia
        this.ciudad = body.ciudad
        this.codigoPostal = body.codigoPostal
    }
}

export interface ClienteDto{
    id: number
    nombre: string
    correo: string
    direccion: DireccionDto
    encodedkey: string    
}

export const clienteChecks = [
    check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser texto')
        .trim(),
    check('correo')
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo debe tener un formato válido')
        .trim()
        .normalizeEmail(),
    check('contrasena')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('direccion.calle')
        .notEmpty()
        .withMessage('La calle es obligatoria')
        .isString()
        .withMessage('La calle debe ser texto')
        .trim(),
    check('direccion.referencia')
        .notEmpty()
        .withMessage('La referencia es obligatoria')    
        .isString()
        .withMessage('La referencia debe ser texto')
        .trim(),
    check('direccion.colonia')
        .notEmpty()
        .withMessage('La colonia es obligatoria')
        .isString()
        .withMessage('La colonia debe ser texto')
        .trim(),
    check('direccion.ciudad')
        .notEmpty()
        .withMessage('La ciudad es obligatoria')
        .isString()
        .withMessage('La ciudad debe ser texto')
        .trim(),
    check('direccion.codigoPostal') 
        .notEmpty()
        .withMessage('El código postal es obligatorio')
        .isString()
        .withMessage('El código postal debe ser texto')
        .trim()
];