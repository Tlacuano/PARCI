import { PersonalizacionController } from "./personalizacion.controller";

export const personalizacionBoundary ={
    consultarPersonalizacion_Local : PersonalizacionController.consultarPersonalizacion_Local,
    registrarPersonalizacionPorDefecto_Local : PersonalizacionController.registrarPersonalizacionPorDefecto_Local
}