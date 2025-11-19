import { Schema, model, Document } from "mongoose"

export interface OrdenDocument extends Document {
    id: number
    encodedkey: string
    clienteId: number
    clienteEncodedkey: string
    productos: any[]
    fechaDeCreacion: Date
    estado: string,
    total: number,
    fechaDeActualizacion: Date
}

const OrdenSchema = new Schema<OrdenDocument>({
    id: { type: Number, required: true },
    encodedkey: { type: String, required: true },
    clienteId: { type: Number, required: true },
    clienteEncodedkey: { type: String, required: true },
    fechaDeCreacion: { type: Date, required: true },
    estado: { type: String, required: true },
    total: { type: Number, required: true },    
    fechaDeActualizacion: { type: Date, required: true },
    productos: { type: Array, required: true },    
}, { timestamps: true })

export const OrdenRepositorio = model<OrdenDocument>('Ordenes', OrdenSchema)