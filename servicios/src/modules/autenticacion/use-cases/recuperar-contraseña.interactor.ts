import { regexValidationAlMenosUnaMayuscula, regexValidationNoEspaciosInicioFin, regexValidationUnAlMenosNumero, regexValidationUnaAlMenosMinuscula, validateRegex } from "../../../kernel/validation";
import { UseCase } from "../../../kernel/contracts";
import { recuperarContraseñaDto } from "../adapters/dtos/recuperar-contraseña.dto";
import { encriptar } from "../utils/bcrypt";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RecuperarContraseñaInteractor implements UseCase<recuperarContraseñaDto,boolean>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    async execute(payload: recuperarContraseñaDto): Promise<boolean> {
        if(payload.nueva_contraseña === '') {
            throw new Error('Campos requeridos incompletos');
        }

        if(payload.confirmar_contraseña === '') {
            throw new Error('Campos requeridos incompletos');
        }

        if (payload.nueva_contraseña !== payload.confirmar_contraseña) {
            throw new Error('Las contraseñas no coinciden');
        }

        if (payload.nueva_contraseña.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }
        
        //al menos una letra mayuscula
        if (!validateRegex(regexValidationAlMenosUnaMayuscula, payload.nueva_contraseña)) {
            throw new Error('La contraseña debe tener al menos una letra mayúscula');
        }

        //al menos una letra minuscula
        if (!validateRegex(regexValidationUnaAlMenosMinuscula, payload.nueva_contraseña)) {
            throw new Error('La contraseña debe tener al menos una letra minúscula');
        }

        //al menos un numero
        if (!validateRegex(regexValidationUnAlMenosNumero, payload.nueva_contraseña)) {
            throw new Error('La contraseña debe tener al menos un número');
        }

        //sin espacion al inicio y al final
        if(!validateRegex(regexValidationNoEspaciosInicioFin, payload.nueva_contraseña)) {
            throw new Error('Ningún campo puede empezar o terminar con espacios');
        }

        payload.nueva_contraseña = await encriptar(payload.nueva_contraseña);

        return this.autenticacionRepository.recuperarContraseña(payload);
    }
}