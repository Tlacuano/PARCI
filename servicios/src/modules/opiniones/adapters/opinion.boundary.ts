import { OpinonController } from "./opinion.controller";

export const OpinionBoundary = {
    consultarReporteUsuario : OpinonController.consultarOpinionesByReporteId,
}