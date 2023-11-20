import { ConexionBD } from "../../../utils/dbconfig";


async function colorCategoriaExistente(colorc: string): Promise<boolean> {
    try {
        const resultado = await ConexionBD<any>("SELECT COUNT(*) AS total FROM categorias WHERE color = ?", [colorc]);
        return resultado[0].total > 0;

    } catch (error) {
        throw error;
    }
}

export { colorCategoriaExistente};