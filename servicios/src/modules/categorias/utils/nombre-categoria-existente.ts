import { ConexionBD } from "../../../utils/dbconfig";


async function nombreCategoriaExistente(nombrec: string): Promise<boolean> {
    try {
        const resultado = await ConexionBD<any>("SELECT COUNT(*) AS total FROM categorias WHERE nombre_categoria = ?", [nombrec]);
        return resultado[0].total > 0;

    } catch (error) {
        throw error;
    }
}

export { nombreCategoriaExistente};