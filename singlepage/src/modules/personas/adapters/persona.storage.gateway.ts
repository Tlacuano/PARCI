import api from "../../../config/http-client.gateway";
import { ResponseApi } from "@/kernel/types";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "../use-cases/ports/persona.repository";

export class PersonaStorageGateway implements PersonaRepository {

    async getPersonas(): Promise<ResponseApi<Persona[]>> {
        const respuesta = await api.doGet("/personas/consultar");
        return {
            ...respuesta.data,
        } as ResponseApi<Persona[]>;
    }

    async registrarPersona(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost("/personas/registrar", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async modificarInformacionPersona(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/personas/modificar-informacion", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async eliminarPersona(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doDelete("/personas/eliminar", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }
}