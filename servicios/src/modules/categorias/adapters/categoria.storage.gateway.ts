import { ConexionBD } from "../../../utils/dbconfig";
import { categoria } from "../entities/categoria";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { modificarEstadoCategoriaDTO } from "./dtos/modificar-estado-categoria";
import { RegistrarCategoriaDTO } from "./dtos/registrar-categoria.dto";

export class CategoriaStorageGateway implements CategoriaRepository {
  async getCategoria(): Promise<categoria[]> {
    try {
      const result = await ConexionBD<categoria[]>(
        "SELECT id_categoria, nombre_categoria, color, estado FROM categorias",
        []
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertCategoria(payload: insertCategoriaDto): Promise<boolean> {
    try {
      await ConexionBD<boolean>(
        "INSERT INTO categorias (nombre_categoria, color, estado) VALUES (?, ?, 1)",
        [payload.nombre_categoria, payload.color]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async modificarCategoria(payload: modifyCategoriaDTO): Promise<boolean> {
    try {
      await ConexionBD<boolean>(
        "UPDATE categorias SET nombre_categoria = ?, color = ? WHERE id_categoria = ?",
        [payload.nombre_categoria, payload.color, payload.id_categoria]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async modificarEstadoCategoria(
    payload: modificarEstadoCategoriaDTO
  ): Promise<boolean> {
    try {
      const result = await ConexionBD<boolean>(
        "UPDATE categorias SET estado = ? WHERE id_categoria = ?",
        [payload.estado, payload.id_categoria]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async buscarCategoriaPorNombre(
    payload: RegistrarCategoriaDTO
  ): Promise<categoria[] | null> {
    try {
      const resultado = await ConexionBD<categoria[]>(
        "SELECT id_categoria, nombre_categoria FROM categorias WHERE nombre_categoria LIKE ?",
        [`%${payload.nombre_categoria}%`]
      );
      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
