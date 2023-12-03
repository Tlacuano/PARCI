import { Personalizacion } from "../../personalizacion/entities/personalizacion"

export type autenticado = {
    rol: string,
    usuario: string,
    municipio: number,
    personalizacion: Personalizacion
    token: string,
    salt?: string,
}