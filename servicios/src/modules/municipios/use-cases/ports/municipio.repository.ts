import { CambiarEstadoMunicipioDTO } from "../../adapters/dtos/cambiar-estado-municipio.dto";
import { ModificarMunicipioDTO } from "../../adapters/dtos/modificar-municipio.dto";
import { RegistrarMunicipioDTO } from "../../adapters/dtos/registrar-municipio.dto";
import { Municipio } from "../../entities/municipios"

export interface MunicipioRepository {
    getMunicipios(): Promise<Municipio[]>;
    registrarMunicipio(payload: RegistrarMunicipioDTO): Promise<boolean>;
    modificarMunicipio(payload: ModificarMunicipioDTO): Promise<boolean>;
    cambiarEstadoMunicipio(payload: CambiarEstadoMunicipioDTO): Promise<boolean>;
}