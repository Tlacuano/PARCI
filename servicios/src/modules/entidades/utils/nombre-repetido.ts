import { ConexionBD } from "../../../utils/dbconfig";

async function nombreRepetido(nombre: string): Promise<boolean> {
  try {
    const resultado = await ConexionBD<any>("SELECT COUNT(*) AS total FROM entidades_federativas WHERE nombre_entidad = ?", [nombre]);
    return resultado[0].total > 0;
  } catch (error) {
    throw error;
  }
}

export { nombreRepetido };
