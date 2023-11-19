import { ConexionBD } from "src/utils/dbconfig";
import { categoria } from "../entities/categoria";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";

export class CategoriaStorageGateway implements CategoriaRepository {

    async getCategoria(): Promise<categoria[]> {
        try{
            const result = ConexionBD <categoria[]>('SELECT * FROM categorias', [])
            if(!result) throw new Error ('No se encontraron errores');
            return result;
        } catch(error){
            throw error;
        }
    }


    async insertCategoria(payload: insertCategoriaDto): Promise<boolean> {
        try {
            const result = ConexionBD <boolean>('INSER INTO categorias (nombre_categoria, color) VALUES (?, 1)', [payload.nombre_categoria,payload.color])
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarCategoria(payload: modifyCategoriaDTO): Promise<boolean> {
        try {
          await ConexionBD<boolean>("UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?", [payload.nombre_categoria, payload.id_categoria]);
          return true;
        } catch (error) {
          throw error;
        }
      }
    
}