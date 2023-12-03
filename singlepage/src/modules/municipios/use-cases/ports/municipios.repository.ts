import { ResponseApi } from "../../../../kernel/types";
import { CambiarEstadoMunicipioDTO } from "../../adapters/dtos/cambiar-estado-municipio.dto";
import { ModificarMunicipioDTO } from "../../adapters/dtos/modificar-municipio.dto";
import { RegistrarMunicipioDTO } from "../../adapters/dtos/registrar-municipio.dto";
import { Municipio } from "../../entities/municipio";

export interface MunicipioRepository {
    getMunicipios(): Promise<ResponseApi<Municipio[]>>;
    buscarMunicipioPorNombre(payload: string): Promise<ResponseApi<Municipio[]> | null>;
    getMunicipiosPorEntidad(fk_idEntidad: number): Promise<ResponseApi<Municipio[]>>;
    registrarMunicipio(payload: RegistrarMunicipioDTO): Promise<ResponseApi<boolean>>;
    modificarMunicipio(payload: ModificarMunicipioDTO): Promise<ResponseApi<boolean>>;
    cambiarEstadoMunicipio(payload: CambiarEstadoMunicipioDTO): Promise<ResponseApi<boolean>>;
}