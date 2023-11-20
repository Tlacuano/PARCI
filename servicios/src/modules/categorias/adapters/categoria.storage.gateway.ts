import { ConexionBD } from "../../../utils/dbconfig";
import { categoria } from "../entities/categoria";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { modificarEstadoCategoriaDTO } from "./dtos/modificar-estado-categoria";

export class CategoriaStorageGateway implements CategoriaRepository {

    async getCategoria(): Promise<categoria[]> {
        try{
            const result = await ConexionBD <categoria[]>('SELECT nombre_categoria, color FROM categorias', [])
            return result;
        } catch(error){
            throw error;
        }
    }

    async insertCategoria(payload: insertCategoriaDto): Promise<boolean> {
        try {
            await ConexionBD<boolean>('INSERT INTO categorias (nombre_categoria, color, estado) VALUES (?, ?, 1)', [payload.nombre_categoria,payload.color])
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    async modificarCategoria(payload: modifyCategoriaDTO): Promise<boolean> {
        try {
          await ConexionBD<boolean>("UPDATE categorias SET nombre_categoria = ?, color = ? WHERE id_categoria = ?", [payload.nombre_categoria,payload.color,payload.id_categoria]);
          return true;
        } catch (error) {
          throw error;
        }
      }

      
    async modificarEstadoCategoria (payload:modificarEstadoCategoriaDTO): Promise <boolean>{
        try{

            const existeCategoria = await ConexionBD<any>('SELECT estado FROM categorias WHERE id_categoria=?', [payload.id_categoria]);

            if (!existeCategoria || existeCategoria.length === 0){
                throw new Error('La categoria solicitada a modificar no existe.');
            }

            if (payload.estado !== 1 && payload.estado !== 0) {
                throw new Error('El estado de la categoría debe ser 0 o 1.');
            }

            const result = await ConexionBD<any>(`UPDATE categorias SET estado = ? WHERE id_categoria = ?`, [payload.estado, payload.id_categoria]);
            console.log(result);
            return true;
        }catch (error){
            console.error(error)
            throw error;
        }
    } 
    
}