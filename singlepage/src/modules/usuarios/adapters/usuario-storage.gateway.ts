import { ResponseApi } from "@/kernel/types";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import api from "../../../config/http-client.gateway";


export class UsuarioStorageGateway implements UsuarioRepository{

    async consultarInformacionOpiniones(payload: string): Promise<ResponseApi<Usuario>> {
        const respuesta = await api.doGet(`/usuarios/consultar-informacion-opiniones/${payload}`);
        return {
            ...respuesta.data,
        } as ResponseApi<Usuario>;
    }

    async getUsuarios(): Promise<ResponseApi<Usuario[]>> {
        const respuesta = await api.doGet("/usuarios/consultar");
        return {
            ...respuesta.data,
        } as ResponseApi<Usuario[]>;
    }

    async registrarUsuario(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost("/usuarios/registrar", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async modificarCuenta(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/usuarios/modificar-cuenta", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async eliminarUsuario(payload: any): Promise<ResponseApi<boolean>> {
        console.log("peilod gateway",payload);
        const respuesta = await api.doDelete("/usuarios/eliminar", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async getUsuarioById(id_usuario: number): Promise<ResponseApi<Usuario>> {
        const respuesta = await api.doGet(`/usuarios/consultar/${id_usuario}`);
        return {
            ...respuesta.data,
        } as ResponseApi<Usuario>;
    }

    async buscarUsuarioPorNombre(payload: any): Promise<ResponseApi<Usuario[] | null>> {
        const respuesta = await api.doPost("/usuarios/buscar", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<Usuario[] | null>;
    }

    async modificarInformacionOpiniones(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/usuarios/modificar-informacion-opiniones", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async reiniciarContadorOpiniones(payload: any): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPut("/usuarios/reiniciar-contador-opiniones", payload);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

    async existeUsuario(usuario: string): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doGet(`/usuarios/existe/${usuario}`);
        return {
            ...respuesta.data,
        } as ResponseApi<boolean>;
    }

}