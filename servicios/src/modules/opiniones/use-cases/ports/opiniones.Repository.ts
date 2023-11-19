import { RequestRegistrarOpinionDto } from "../../adapters/dto/request-registrar-opinion.dto";
import { Opinion } from "../../entities/opinion";




export interface OpinionesRepository {
    consultarOpinionesByReporteId(payload:number):Promise<Opinion[]>
    registrarOpinion(payload:RequestRegistrarOpinionDto):Promise<boolean>
    eliminarOpinion(payload:number):Promise<boolean>
    actualizarOpinion(payload:Opinion):Promise<boolean>
    aumentarVotoPositivo(payload:number):Promise<boolean>
    aumentarVotoNegativo(payload:number):Promise<boolean>
    consultarVotosPositivosActuales(payload:number):Promise<number>
    consultarVotosNegativosActuales(payload:number):Promise<number>
}