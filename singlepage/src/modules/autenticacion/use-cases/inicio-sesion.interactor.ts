import { AutenticacionRepository } from './ports/autenticacion.repository';
import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { inicioSesionDto } from "../adapters/dtos/inicio-sesion.dto";
import { autenticado } from "../entities/autenticado";



export class InicioSesionInteractor implements UseCase<inicioSesionDto,ResponseApi<autenticado>>{
    constructor(private autenticacionRepository:AutenticacionRepository) {}

    execute(payload: inicioSesionDto): Promise<ResponseApi<autenticado>> {
        return this.autenticacionRepository.InisioSesion(payload);
    }
}