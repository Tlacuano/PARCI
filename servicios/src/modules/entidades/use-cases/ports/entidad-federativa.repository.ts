import { ModificarEntidadFederativaDTO } from "../../adapters/dtos/modificar-entidad-federativa.dto";
import { RegistrarEntidadFederativaDTO } from "../../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativa } from "../../entities/entidad-federativa";

export interface EntidadFederativaRepository {
  getEntidadesFederativas(): Promise<EntidadFederativa[]>;
  registrarEntidadFederativa(payload: RegistrarEntidadFederativaDTO): Promise<boolean>;
  modificarEntidadFederativa(payload: ModificarEntidadFederativaDTO): Promise<boolean>;
}
