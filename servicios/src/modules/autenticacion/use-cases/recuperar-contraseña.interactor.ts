import { regexValidationContrasena } from './../../../kernel/validation';
import { regexValidationAlMenosUnaMayuscula, regexValidationNoEspaciosInicioFin, regexValidationUnAlMenosNumero, regexValidationUnaAlMenosMinuscula, validateRegex } from "../../../kernel/validation";
import { UseCase } from "../../../kernel/contracts";
import { recuperarContraseñaDto } from "../adapters/dtos/recuperar-contraseña.dto";
import { encriptar } from "../../../kernel/bcrypt";
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
        if(!validateRegex(regexValidationContrasena, payload.nueva_contraseña)) {
            throw new Error('Formato de contraseña incorrecto');
        }

        //sin espacion al inicio y al final
        if(!validateRegex(regexValidationNoEspaciosInicioFin, payload.nueva_contraseña)) {
            throw new Error('Ningún campo puede empezar o terminar con espacios');
        }

        payload.nueva_contraseña = await encriptar(payload.nueva_contraseña);

        return this.autenticacionRepository.recuperarContraseña(payload);
    }
}