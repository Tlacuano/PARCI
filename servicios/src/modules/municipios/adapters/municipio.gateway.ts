import { ConexionBD } from "../../../utils/dbconfig";
import { Municipio } from "../entities/municipio";
import { MunicipioRepository } from "../use-cases/ports/municipio.repository";
import { CambiarEstadoMunicipioDTO } from "./dtos/cambiar-estado-municipio.dto";
import { ModificarMunicipioDTO } from "./dtos/modificar-municipio.dto";
import { RegistrarMunicipioDTO } from "./dtos/registrar-municipio.dto";

export class MunicipioStorageGateway implements MunicipioRepository {
    async getMunicipios(): Promise<Municipio[]> {
        try {
            const resultado  = await ConexionBD<Municipio[]>("SELECT id_municipio, nombre_municipio, fk_idEntidad FROM municipios WHERE estado = 1", []);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async getMunicipiosPorEntidad(fk_idEntidad: number): Promise<Municipio[]> {
        try {
            const resultado = await ConexionBD<Municipio[]>("SELECT id_municipio, nombre_municipio FROM municipios WHERE fk_idEstado = ? AND estado = 1", [fk_idEntidad]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async registrarMunicipio(payload: RegistrarMunicipioDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("INSERT INTO municipios (nombre_municipio, fk_idEntidad, estado) VALUES(?,?,1)", [payload.nombre_municipio,payload.fk_idEntidad]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarMunicipio(payload: ModificarMunicipioDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE municipios SET nombre_municipio = ?, fk_idEntidad = ? WHERE id_municipio = ?", [payload.nombre_municipio,payload.fk_idEntidad,payload.id_municipio]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo modificar el municipio");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    async cambiarEstadoMunicipio(payload: CambiarEstadoMunicipioDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("UPDATE municipios SET estado = ? WHERE id_municipio = ?", [payload.estado,payload.id_municipio]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async buscarMunicipioPorNombre(payload: string): Promise<Municipio[] | null> {
        try {
            const resultado = await ConexionBD<Municipio[]>("SELECT id_municipio, nombre_municipio FROM municipios WHERE nombre_municipio LIKE ?", 
            [payload]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
  }