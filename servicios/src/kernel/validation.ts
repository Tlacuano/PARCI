export const regexValidationAlMenosUnaMayuscula = /.*[A-Z].*/g;
export const regexValidationUnaAlMenosMinuscula = /.*[a-z].*/g;
export const regexValidationUnAlMenosNumero = /.*[0-9].*/g;
export const regexValidationNoEspaciosInicioFin = /^(?!\s)(.*\S)?(?<!\s)$/g;
export const regexValidationNoCaracteresEspeciales = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]*$/g;


export const validateRegex = (regex: RegExp, value: string) => {
    //validar el regex
    const result = regex.test(value);
    //si no es valido retornar false
    if (!result) {
        return false;
    }
    //si es valido retornar true
    return true;
}