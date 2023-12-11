import { CambiarEstadoMunicipioDTO } from "../../adapters/dtos/cambiar-estado-municipio.dto";
import { ModificarMunicipioDTO } from "../../adapters/dtos/modificar-municipio.dto";
import { RegistrarMunicipioDTO } from "../../adapters/dtos/registrar-municipio.dto";
import { MunicipioActivo } from "../../adapters/dtos/muncipio-activo.dto";
import { Municipio } from "../../entities/municipio"

export interface MunicipioRepository {
    getMunicipios(): Promise<Municipio[]>;
    getMunicipiosActivos(): Promise<MunicipioActivo[]>;
    buscarMunicipioPorNombre(nombre: string): Promise<Municipio[] | null>;
    getMunicipiosPorEntidad(fk_idEntidad: number): Promise<Municipio[]>;
    registrarMunicipio(payload: RegistrarMunicipioDTO): Promise<boolean>;
    modificarMunicipio(payload: ModificarMunicipioDTO): Promise<boolean>;
    cambiarEstadoMunicipio(payload: CambiarEstadoMunicipioDTO): Promise<boolean>;
}