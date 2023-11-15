import { EntidadFederativa } from "../../entities/entidad-federativa";

export interface EntidadFederativaRepository {
  getEntidadesFederativas(): Promise<EntidadFederativa[]>;
}