import { Schema, model, Document } from 'mongoose'

export interface ProductoDocument extends Document {
    id: number
    nombre: string
    descripcion: string
    precio: number
    categoriaId: number
    encodedkey: string
    nombreDeLaImagen: string
    rutaDeLaImagen: string
    estaActivo: boolean
}

const ProductoSchema = new Schema<ProductoDocument>({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    categoriaId: { type: Number, required: true },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true },
    nombreDeLaImagen: { type: String, required: false },
    rutaDeLaImagen: { type: String, required: false }
}, { timestamps: true })

export const ProductoRepositorio = model<ProductoDocument>('Productos', ProductoSchema)