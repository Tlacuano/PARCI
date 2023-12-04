import { CambiarEstadoEntidadFederativaDTO } from "../../adapters/dtos/cambiar-estado-entidad-federativa.dto";
import { EntidadFederativaActiva } from "../../adapters/dtos/entidad-federativa-activa";
import { ModificarEntidadFederativaDTO } from "../../adapters/dtos/modificar-entidad-federativa.dto";
import { RegistrarEntidadFederativaDTO } from "../../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativa } from "../../entities/entidad-federativa";

export interface EntidadFederativaRepository {
  getEntidadesFederativas(): Promise<EntidadFederativa[]>;
  getEntidadesFederativasActivas(): Promise<EntidadFederativaActiva[]>;
  registrarEntidadFederativa(payload: RegistrarEntidadFederativaDTO): Promise<boolean>;
  modificarEntidadFederativa(payload: ModificarEntidadFederativaDTO): Promise<boolean>;
  cambiarEstadoEntidadFederativa(payload: CambiarEstadoEntidadFederativaDTO): Promise<boolean>;
  buscarEntidadPorNombre(payload: RegistrarEntidadFederativaDTO): Promise<EntidadFederativa[] | null>;
}
