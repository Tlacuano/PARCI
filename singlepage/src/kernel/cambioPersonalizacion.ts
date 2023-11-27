import { Personalizacion } from "../modules/personalizacion/entities/personalizacion"


export const cambioPersonalizacion =  (personalizacion: Personalizacion) => {
    
    document.documentElement.setAttribute('data-theme', personalizacion.tema)
    document.documentElement.setAttribute('font', personalizacion.tamaño_letra)
    
}