import { PersonaRepository } from "../use-cases/ports/persona.repository";
import { RegistrarPersonaDTO } from "../adapters/dtos/registrar-persona.dto";
import { ConexionBD } from "../../../utils/dbconfig";
import { ModificarInformacionPersonaDTO } from "../adapters/dtos/modificar-informacion-persona.dto";
import { Persona } from "../entities/persona";
import { EliminarPersonaDTO } from "../adapters/dtos/eliminar-persona.dto";

export class PersonaStorageGateway
implements PersonaRepository {

    async getPersonas(): Promise<Persona[]> {
        try {
            const resultado = await ConexionBD<Persona[]>("SELECT id_persona, nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio FROM personas", []);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async registrarPersona(payload: RegistrarPersonaDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("INSERT INTO personas (nombre, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, fk_idMunicipio) VALUES (?, ?, ?, ?, ?, ?)", [payload.nombre, payload.apellido_paterno, payload.apellido_materno, payload.correo_electronico, payload.fecha_nacimiento, payload.fk_idMunicipio]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarInformacionPersona(payload: ModificarInformacionPersonaDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE personas SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, correo_electronico = ? WHERE id_persona = ?", [payload.nombre, payload.apellido_paterno, payload.apellido_materno, payload.correo_electronico, payload.id_persona]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se pudo modificar la información de la persona");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPersona(payload: EliminarPersonaDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("DELETE FROM personas WHERE id_persona = ?", [payload.id_persona]);
            return true;
        } catch (error) {
            throw error;
        }
    }

}