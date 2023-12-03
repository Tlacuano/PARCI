import { RequestConsultarReportesDto } from "../../adapters/dto/request-consultar-reportes.dto";
import { RequestEliminarOpinionDto } from "../../adapters/dto/request-eliminar-opinion.dto";
import { RequestModificarOpinionDto } from "../../adapters/dto/request-modificar-opinion.dto";
import { RequestRegistrarOpinionDto } from "../../adapters/dto/request-registrar-opinion.dto";
import { Opinion } from "../../entities/opinion";





export interface OpinionesRepository {
    consultarOpinionesByReporteId(payload:RequestConsultarReportesDto):Promise<Opinion[]>
    registrarOpinion(payload:RequestRegistrarOpinionDto):Promise<boolean>
    eliminarOpinion(payload:RequestEliminarOpinionDto):Promise<boolean>
    modificarOpinion(payload:RequestModificarOpinionDto):Promise<boolean>
    aumentarVotoPositivo(payload:number):Promise<boolean>
    aumentarVotoNegativo(payload:number):Promise<boolean>
}