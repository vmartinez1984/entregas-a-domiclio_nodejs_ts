import { Schema, model, Document } from 'mongoose'

export interface CategoriaDocument extends Document {
    id: number
    nombre: string
    encodedkey: string
    estaActivo: boolean
}

const CategoriaSchema = new Schema<CategoriaDocument>({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true }
}, { timestamps: true })

export const CategoriaRepositorio = model<CategoriaDocument>('Categorias', CategoriaSchema)