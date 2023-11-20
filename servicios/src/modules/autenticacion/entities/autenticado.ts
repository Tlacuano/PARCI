import { Personalizacion } from "../../personalizacion/entities/personalizacion"

export type autenticado = {
    rol: string,
    usuario: string,
    municipio: string,
    personalizacion: Personalizacion
    token: string,
    salt?: string,
}