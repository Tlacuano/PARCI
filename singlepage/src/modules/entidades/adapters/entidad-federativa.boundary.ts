import { EntidadFederativaController } from "./entidad-federativa.controller";
import { ObtenerEntidadesFederativasActivasInteractor } from "./../use-cases/obtener-entidades-activas.interactor";

export const EntidadFederativaBoundary = {
  obtenerEntidadesFederativasActivas_local: EntidadFederativaController.obtenerEntidadesFederativasActivas_local,
};
