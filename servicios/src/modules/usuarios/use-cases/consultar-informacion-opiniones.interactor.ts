import { UsuarioRepository } from './ports/usuario.repository';
import { InformacionOpinionesDto } from '../adapters/dtos/informacion-opiniones.dto';
import { UseCase } from './../../../kernel/contracts';



export class ConsultarInformacionOpinionesInteractor implements UseCase<string,InformacionOpinionesDto>{
    constructor(private usuarioRepository : UsuarioRepository) { }

    execute(payload: string): Promise<InformacionOpinionesDto> {
        if (!payload) {
            throw new Error("El usuario es requerido");
        }
        return this.usuarioRepository.consultarInformacionOpiniones(payload);
    }
}