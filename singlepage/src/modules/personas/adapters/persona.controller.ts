import { ResponseApi } from "@/kernel/types";
import { Persona } from "../../personas/entities/persona";
import { RegistrarPersonaDTO } from "../../personas/adapters/dtos/registrar-persona.dto";
import { ModificarInformacionPersonaDTO } from "../../personas/adapters/dtos/modificar-informacion-persona.dto";
import { EliminarPersonaDTO } from "../../personas/adapters/dtos/eliminar-persona.dto";
import { PersonaRepository } from "../../personas/use-cases/ports/persona.repository";
import { PersonaStorageGateway } from "../../personas/adapters/persona.storage.gateway";
import { ObtenerPersonasInteractor } from "../../personas/use-cases/get-personas.interactor";
import { RegistrarPersonaInteractor } from "../../personas/use-cases/registrar-persona.interactor";
import { ModificarInformacionPersonaInteractor } from "../../personas/use-cases/modificar-informacion-persona.interactor";
import { EliminarPersonaInteractor } from "../../personas/use-cases/eliminar-persona.interactor";

export class PersonaController{
    private obtenerError(error: any){
        return{
            status: error.status,
            error: true,
            message: error.message,
        } as ResponseApi<any>;
    }


    // CONSULTAR PERSONAS
    obtenerPersonas = async () => {
        try{
            const repositorio: PersonaRepository = new PersonaStorageGateway();
            const obtenerPersonasInteractor = new ObtenerPersonasInteractor(repositorio);

            const respuesta = await obtenerPersonasInteractor.execute();

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    // REGISTRAR PERSONA
    registrarPersona = async (payload: RegistrarPersonaDTO) => {
        try{
            const repositorio: PersonaRepository = new PersonaStorageGateway();
            const registrarPersonaInteractor = new RegistrarPersonaInteractor(repositorio);

            const respuesta = await registrarPersonaInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    // MODIFICAR PERSONA
    modificarInformacionPersona = async (payload: ModificarInformacionPersonaDTO) => {
        try{
            const repositorio: PersonaRepository = new PersonaStorageGateway();
            const modificarInformacionPersonaInteractor = new ModificarInformacionPersonaInteractor(repositorio);

            const respuesta = await modificarInformacionPersonaInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    // ELIMINAR PERSONA
    eliminarPersona = async (payload: EliminarPersonaDTO) => {
        try{
            const repositorio: PersonaRepository = new PersonaStorageGateway();
            const eliminarPersonaInteractor = new EliminarPersonaInteractor(repositorio);

            const respuesta = await eliminarPersonaInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    


}