import fs from 'fs/promises';
import path from 'path';

export class AlmacenDeArchivos {

    async guardarArchivoAsync(nombre: string, datos: Buffer): Promise<string> {
        const ruta = `${path.join(__dirname, "..", "..", "public", "images")}/${nombre}`
        await fs.writeFile(ruta, datos)

        return ruta
    }
}