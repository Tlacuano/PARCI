import { AutenticacionRepository } from './ports/autenticacion.repository';
import { UseCase } from "../../../kernel/contracts";
import { inicioSesionDto } from "../adapters/dtos/inicio-sesion.dto";
import { autenticado } from "../entities/autenticado";



export class InicioSesionInteractor implements UseCase<inicioSesionDto, autenticado> {
    constructor( private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: inicioSesionDto): Promise<autenticado> {
        if(!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if(!payload.contraseña || payload.contraseña === '') {
            throw new Error('La contraseña es requerida');
        }

        return this.autenticacionRepository.inicioSesion(payload);
    }
}