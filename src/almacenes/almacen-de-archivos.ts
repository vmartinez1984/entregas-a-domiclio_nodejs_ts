import fs from 'fs/promises';
import path from 'path';

export class AlmacenDeArchivos {

    async actualizarArchivoAsync(nombreDeLaImagen: string, data: Buffer): Promise<void> {
        const ruta = `${path.join(__dirname, "..", "..", "public", "images")}/${nombreDeLaImagen}`
        await fs.unlink(ruta)
        await fs.writeFile(ruta, data)
    }

    async guardarArchivoAsync(nombreDeLaImagen: string, datos: Buffer): Promise<string> {
        const ruta = `${path.join(__dirname, "..", "..", "public", "images")}/${nombreDeLaImagen}`
        await fs.writeFile(ruta, datos)

        return ruta
    }
}