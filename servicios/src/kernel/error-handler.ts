import { ResponseApi } from "./types";

const errores: { [x: string]: ResponseApi<undefined> } = {
  //generales
  "Estado inválido": { status: 400, error: true, message: "Estado inválido" },
  "Campos requeridos incompletos": { status: 400, error: true, message: "Campos requeridos incompletos" },
  "Server Error": { status: 500, error: true, message: "Server Error" },
  "Ningún campo puede empezar o terminar con espacios": { status: 400, error: true, message: "Ningún campo puede empezar o terminar con espacios" },
  "El id es requerido": { status: 400, error: true, message: "El id es requerido" },
  "Ocurrio un error al eliminar": { status: 400, error: true, message: "Ocurrio un error al eliminar" },
  "Ocurrio un error al modificar": { status: 400, error: true, message: "Ocurrio un error al modificar" },

  //autenticacion
  "Usuario o contraseña incorrectos": { status: 400, error: true, message: "Usuario o contraseña incorrectos" },
  "Código incorrecto": { status: 400, error: true, message: "Código incorrecto" },
  "No autorizado": { status: 401, error: true, message: "No autorizado" },
  "Error al generar el codigo": { status: 400, error: true, message: "Error al generar el codigo" },
  "El codigo es requerido": { status: 400, error: true, message: "El codigo es requerido" },

  //usuarios
  "El usuario es requerido": { status: 400, error: true, message: "El usuario es requerido" },
  "Usuario no encontrado": { status: 404, error: true, message: "Usuario no encontrado" },
  "La contraseña es requerida": { status: 400, error: true, message: "La contraseña es requerida" },
  "La contraseña debe tener al menos 8 caracteres": { status: 400, error: true, message: "La contraseña debe tener al menos 8 caracteres" },
  "Las contraseñas no coinciden": { status: 400, error: true, message: "Las contraseñas no coinciden" },
  "La contraseña debe tener al menos una letra mayúscula": { status: 400, error: true, message: "La contraseña debe tener al menos una letra mayúscula" },
  "La contraseña debe tener al menos una letra minúscula": { status: 400, error: true, message: "La contraseña debe tener al menos una letra minuscula" },
  "La contraseña debe tener al menos un número": { status: 400, error: true, message: "La contraseña debe tener al menos un número" },
  "Formato de contraseña incorrecto": { status: 400, error: true, message: "Formato de contraseña incorrecto" },

  //personalizacion
  "No se pudo modificar la personalizacion": { status: 400, error: true, message: "No se pudo modificar la personalizacion" },
  "El tema es requerido": { status: 400, error: true, message: "El tema es requerido" },
  "El tamaño de letra es requerido": { status: 400, error: true, message: "El tamaño de letra es requerido" },

  //entidades federativas
  "El nombre es requerido": { status: 400, error: true, message: "El nombre es requerido" },
  "El nombre ya existe": { status: 400, error: true, message: "El nombre ya existe" },
  "No se pudo modificar la entidad federativa": { status: 400, error: true, message: "No se pudo modificar la entidad federativa" },
  "El nombre no debe contener caracteres especiales": { status: 400, error: true, message: "El nombre no debe contener caracteres especiales" },
  
  //municipios
  "El nombre del municipio es requerido": {status: 400, error: true, message: "El nombre es requerido"},
  "La entidad federativa es requerida": {status: 400, error: true, message: "La entidad federativa es requerido"},
  "No se pudo modificar el municipio": {status: 400, error: true, message: "No se pudo modificar el municipio"},
  "El nombre no deve contener caracteres especiales": {status: 400, error: true, message: "El nombre no debe contener caracteres especiales" },

  //categorias
  "El nombre de la categoria es requerido": {status: 400, error: true, message: "El nombre es requerido"},
  "El id de la categoria es requerido": {status: 400, error: true, message: "El id es requerido"},
  "El nombre de la categoria ya existe": {status: 400, error: true, message: "El nombre ya existe"},
  "El color de la categoria ya existe": {status: 400, error: true, message: "El color ya existe"},
  "El color de la categoria debe de seguir el orden de un codigo hexadecimal": {status: 400, error: true, message: "El color es invalido"},

  //opciones
  "No se pudo registrar la opinion" : {status: 400, error: true, message: "No se pudo registrar la opinion"},
  "Ya no puedes dar mas opiniones por el dia de hoy": {status: 400, error: true, message: "Ya no puedes dar mas opiniones por el dia de hoy"},
  "No se pudo eliminar la opinion": {status: 400, error: true, message: "No se pudo eliminar la opinion"},
  "No se pudo modificar la opinion": {status: 400, error: true, message: "No se pudo modificar la opinion"},
  "El voto debe ser positivo o negativo": {status: 400, error: true, message: "El voto debe ser positivo o negativo"},
  "La fecha de la opinion no puede ser mayor a la actual": {status: 400, error: true, message: "La fecha de la opinion no puede ser mayor a la actual"},
  "No se puede dejar una opinion vacia": {status: 400, error: true, message: "No se puede dejar una opinion vacia"},

  //reportes
  "No se encontró el reporte solicitado" : {status: 404, error: true, message: "No se encontró el reporte solicitado"},
  "El titulo del reporte es requerido" : {status: 400, error: true, message: "El titulo del reporte es requerido"},
  "La descripcion del reporte es requerido" : {status: 400, error: true, message: "La descripcion del reporte es requerido"},
  "La imagen del reporte es requerido" : {status: 400, error: true, message: "La imagen del reporte es requerido"},
  "La categoria del reporte es requerido" : {status: 400, error: true, message: "La categoria del reporte es requerido"},
  "No se pudo eliminar el reporte" : {status: 400, error: true, message: "No se pudo eliminar el reporte"},
  //votos
  "El voto es requerido" : {status: 400, error: true, message: "El voto es requerido"},
};

export const validarError = (error: Error): ResponseApi<undefined> => {
  return errores[error.message] || errores["Server Error"];
};

