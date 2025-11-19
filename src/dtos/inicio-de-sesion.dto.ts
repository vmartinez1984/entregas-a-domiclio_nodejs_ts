export class InicioDeSesionDto{
    correo: string
    contrasena: string

    constructor(body: any){
        this.correo = body.correo
        this.contrasena = body.contrasena
    }
}