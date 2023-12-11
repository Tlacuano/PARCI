// En modificar-persona.interactor.ts

import { UseCase } from "src/kernel/contracts";
import { ModificarInformacionPersonaDTO } from "../adapters/dtos/modificar-informacion-persona.dto";
import { ModificarCuentaPersonaDTO } from "../adapters/dtos/modificar-persona.dto";
import { PersonaRepository } from "./ports/persona.repository";


export class ModificarPersonaInteractor
  implements UseCase<ModificarCuentaPersonaDTO, boolean>
{
  constructor(private readonly repository: PersonaRepository) {}

  async execute(payload: ModificarCuentaPersonaDTO): Promise<boolean> {
    if (!payload.usuario) {
      throw new Error("El campo 'usuario' es requerido para la modificación");
    }

    const personaInfo = await this.repository.getPersonaInfoByUsuario(payload.usuario);


    const payloadCompleto = {
      id_persona: personaInfo.id_persona,
      ...payload,
    };

    return await this.repository.modificarPersona(payloadCompleto);
  }
}
