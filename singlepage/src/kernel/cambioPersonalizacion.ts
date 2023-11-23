import { Personalizacion } from "../modules/personalizacion/entities/personalizacion"


export const cambioPersonalizacion =  (personalizacion: Personalizacion) => {
    
    document.documentElement.setAttribute('data-theme', personalizacion.tema)
    var currentTheme = document.documentElement.getAttribute('data-theme')
    
}