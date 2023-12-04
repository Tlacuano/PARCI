import { ResponseApi } from "../../../kernel/types";
import { Municipio } from "../entities/municipio";
import api from '../../../config/http-client.gateway'
import { MunicipioRepository } from "../use-cases/ports/municipios.repository";
import { RegistrarMunicipioDTO } from "./dtos/registrar-municipio.dto";
import { ModificarMunicipioDTO } from "./dtos/modificar-municipio.dto";
import { CambiarEstadoMunicipioDTO } from "./dtos/cambiar-estado-municipio.dto";

export class MunicipioStorageGateway implements MunicipioRepository{
    
    async getMunicipios(): Promise<ResponseApi<Municipio[]>> {
        const respuesta = await api.doGet("/municipios/consultar");

        return {
            ...respuesta.data,
        } as ResponseApi<Municipio[]>;
    }

    async getMunicipiosPorEntidad(fk_idEntidad: number): Promise<ResponseApi<Municipio[]>> {
        const respuesta = await api.doGet("/municipios/consultar-por-entidad", {fk_idEntidad});

        return {
            ...respuesta.data,
        } as ResponseApi<Municipio[]>;
    }

    async buscarMunicipioPorNombre(payload: string): Promise<ResponseApi<Municipio[]> | null> {
        const respuesta = await api.doGet("/municipios/buscar-por-nombre", {payload});

        return {
            ...respuesta.data,
        } as ResponseApi<Municipio[]>
    }

    async registrarMunicipio(payload: RegistrarMunicipioDTO): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost("/municipios/registrar", payload);

        return {
            ...respuesta.data
        } as ResponseApi<boolean>;
    }

    async modificarMunicipio(payload: ModificarMunicipioDTO): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/municipios/modificar", payload);

        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async cambiarEstadoMunicipio(payload: CambiarEstadoMunicipioDTO): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/municipios/cambiar-estado", payload);

        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }
}