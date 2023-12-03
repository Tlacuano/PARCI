import { ResponseApi } from "@/kernel/types";
import { categoria } from "../entities/categoria";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import api from '@/config/http-client.gateway';
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";

export class CategoriaStorageGateway implements CategoriaRepository {
    async getCategorias(): Promise<ResponseApi<categoria[]>> {
        try{
            const { data } = await api.doGet('/categorias/consultar');
            return {
                status: data.status,
                data: data.data,
                message: data.message,
                error: data.error,
            } as ResponseApi<categoria[]>

        } catch(error: any){
            return {
                status: 500,
                message: error.message,
                error: true,
            } as ResponseApi<categoria[]>;
        }
    }

    async registrarCategoria(payload: insertCategoriaDto): Promise<ResponseApi<boolean>> {
        try{
            const { data } = await api.doPost('/categorias/registrar', payload);
            return {
                status: data.status,
                data: data.data,
                message: data.message,
                error: data.error,
            } as ResponseApi<boolean>

        } catch(error: any){
            return {
                status: 500,
                message: error.message,
                error: true,
            } as ResponseApi<boolean>;
        }
    }

    async modificarCategoria(payload: modifyCategoriaDTO): Promise<ResponseApi<boolean>> {
        try{
            const { data } = await api.doPut('/categorias/modificar', payload);
            return {
                status: data.status,
                data: data.data,
                message: data.message,
                error: data.error,
            } as ResponseApi<boolean>

        } catch(error: any){
            return {
                status: 500,
                message: error.message,
                error: true,
            } as ResponseApi<boolean>;
        }
    }

}