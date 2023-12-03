export type Opinion = {
    id_opinion: number,
    fecha: string,
    opinion: string,
    votos_positivos: number,
    votos_negativos: number,
    fk_idReporte: number,
    nombre_completo_persona: number,
    voto_usuario?: string
    
}