import { ConexionBD } from "src/utils/dbconfig";

async function nombreRepetidoMunicipio(nombre_municipio: string): Promise<boolean> {
    try {
        const resultado = await ConexionBD<any>("SELECT COUNT(*) AS total FROM municipios WHERE nombre_municipio = ?", [nombre_municipio]);
        return resultado[0].total > 0;
    } catch (error) {
        throw error;
    }
    
}

export {nombreRepetidoMunicipio}