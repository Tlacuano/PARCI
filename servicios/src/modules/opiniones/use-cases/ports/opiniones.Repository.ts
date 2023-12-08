import { VotarOpinionDto } from './../../adapters/dto/request-votar-opinion.dto';
import { RequestConsultarReportesDto } from "../../adapters/dto/request-consultar-reportes.dto";
import { RequestEliminarOpinionDto } from "../../adapters/dto/request-eliminar-opinion.dto";
import { RequestModificarOpinionDto } from "../../adapters/dto/request-modificar-opinion.dto";
import { RequestRegistrarOpinionDto } from "../../adapters/dto/request-registrar-opinion.dto";
import { Opinion } from "../../entities/opinion";
import { ResponseVotoOpinionDto } from '../../adapters/dto/response-consultar-voto-usuario-opinioin.dto';





export interface OpinionesRepository {
    consultarOpinionesByReporteId(payload:RequestConsultarReportesDto):Promise<Opinion[]>
    registrarOpinion(payload:RequestRegistrarOpinionDto):Promise<boolean>
    eliminarOpinion(payload:RequestEliminarOpinionDto):Promise<boolean>
    modificarOpinion(payload:RequestModificarOpinionDto):Promise<boolean>


    consultarVotoOpinion(payload:VotarOpinionDto):Promise<ResponseVotoOpinionDto>
    modificarVotoOpinion(payload:VotarOpinionDto):Promise<boolean>
    registrarVotoOpinion(payload:VotarOpinionDto):Promise<boolean>
    eliminarVotoOpinion(payload:VotarOpinionDto):Promise<boolean>

}