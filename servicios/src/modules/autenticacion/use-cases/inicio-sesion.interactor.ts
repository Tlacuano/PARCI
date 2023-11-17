import { AutenticacionRepository } from './ports/autenticacion.repository';
import { UseCase } from "../../../kernel/contracts";
import { inicioSesionDto } from "../adapters/dtos/inicio-sesion.dto";
import { autenticado } from "../entities/autenticado";



export class InicioSesionInteractor implements UseCase<inicioSesionDto, autenticado> {
    constructor( private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: inicioSesionDto): Promise<autenticado> {
        return this.autenticacionRepository.inicioSesion(payload);
    }
}