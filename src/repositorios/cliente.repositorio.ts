import { Schema, model, Document } from 'mongoose'

export interface ClienteDocument extends Document {
    id: number
    nombre: string
    correo: string
    contrasena: string
    direccion: {
        calle: string
        referencia: string
        ciudad: string    
        codigoPostal: string
        colonia: string
    }
    encodedkey: string
    estaActivo: boolean
    fecha: Date
}

const ClienteSchema = new Schema<ClienteDocument>({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    direccion: {
        calle: { type: String, required: true },
        referencia: { type: String, required: true },
        ciudad: { type: String, required: true },
        colonia: { type: String, required: true },
        codigoPostal: { type: String, required: true }
    },
    encodedkey: { type: String, required: true },
    estaActivo: { type: Boolean, required: true },
    fecha: { type: Date, required: true }
}, { timestamps: true })

export const ClienteRepositorio = model<ClienteDocument>('Clientes', ClienteSchema)