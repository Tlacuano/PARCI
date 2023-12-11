import { personalizacionBoundary } from './../../personalizacion/adapters/personalizacion.boundary';
import { Personalizacion } from './../../personalizacion/entities/personalizacion';
import { RegistrarCodigoInteractor } from './../use-cases/registrar-codigo-rc.interactor';
import { BuscarUsuarioInteractor } from './../use-cases/buscar-usuario-para-registrar-codigo-rp';
import { InicioSesionInteractor } from './../use-cases/inicio-sesion.interactor';
import { Request, Response, Router } from "express";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { AutenticacionStorageGateway } from "./autenticacion.storage.gateway";
import { ResponseApi } from '../../../kernel/types';
import { autenticado } from '../entities/autenticado';
import { validarError } from '../../../kernel/error-handler';
import { registrarCodigoUsuarioDto } from './dtos/registrar-codigo-usuario.dto';
import { codigoRandom } from '../utils/codigo-aleatorio';
import { generarToken } from '../../../kernel/jwt';
import { sendEmail } from '../../../kernel/nodemailer';
import { VerificarCodigoInteractor } from '../use-cases/verificar-codigo-rc.interactor';
import { recuperarContraseñaDto } from './dtos/recuperar-contraseña.dto';
import { compararEncriptado, encriptar } from '../../../kernel/bcrypt';
import { RecuperarContraseñaInteractor } from '../use-cases/recuperar-contraseña.interactor';


const autenticacionRouter = Router();

export class AutenticacionController {

    inicioSesion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as inicioSesionDto;

            //procesos para validar credenciales
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway;
            const inicioSesionInteractor = new InicioSesionInteractor(repositorio);

            const autenticado = await inicioSesionInteractor.execute(payload);


            if (!(await compararEncriptado(payload.contraseña, autenticado.salt as string))) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            autenticado.salt = undefined;

            const token = generarToken(autenticado);
            autenticado.token = token;

            //traer personalizacion
            const Personalizacion = await personalizacionBoundary.consultarPersonalizacion_Local(autenticado.usuario) as Personalizacion;

            autenticado.personalizacion = Personalizacion;
            
            const body: ResponseApi<autenticado> = {
                data: autenticado,
                message: 'Inicio de sesión exitoso',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);

        } catch (error) {            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    //RECUPERACION DE CONTRASEÑA = RC
    registrarCodigoRC = async (req: Request, res: Response) => {
        try {
            const payload = req.body as registrarCodigoUsuarioDto;

            //buscar usuario
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway;
            const buscarUsuarioInteractor = new BuscarUsuarioInteractor(repositorio);

            const usuario = await buscarUsuarioInteractor.execute(payload);

            usuario.codigo = codigoRandom();
            
            //guardar codigo en la bd
            const registrarCodigoInteractor = new RegistrarCodigoInteractor(repositorio);
            const resultado = await registrarCodigoInteractor.execute(usuario);

            //enviar codigo al correo
            await sendEmail(usuario.correo_electronico, 'Recuperación de contraseña','Recuperación de contraseña', 'Su código de recuperación es:', usuario.codigo);

            const body: ResponseApi<boolean> = {
                data: resultado,
                message: 'Código enviado',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);

        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    //Comparar codigos RC
    verificarCodigoRC = async (req: Request, res: Response) => {
        try {
            const payload = req.body as registrarCodigoUsuarioDto;

            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway;
            const verificarCodigoInteractor = new VerificarCodigoInteractor(repositorio);

            const resultado = await verificarCodigoInteractor.execute(payload);

            if (resultado.codigo !== payload.codigo) {
                throw new Error('Código incorrecto');
            }

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Código correcto',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);

        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    recuperarContraseña = async (req: Request, res: Response) => {
        try {
            const payload = req.body as recuperarContraseñaDto;

            console.log(payload);
            

            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway;
            const recuperarContraseñaInteractor = new RecuperarContraseñaInteractor(repositorio);

            const resultado = await recuperarContraseñaInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: resultado,
                message: 'Contraseña actualizada',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
            
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

}

const autenticacionController = new AutenticacionController();

autenticacionRouter.post('/inicio-sesion', autenticacionController.inicioSesion);
autenticacionRouter.post('/registrar-codigo', autenticacionController.registrarCodigoRC);
autenticacionRouter.post('/verificar-codigo', autenticacionController.verificarCodigoRC);
autenticacionRouter.post('/recuperar-contrasena', autenticacionController.recuperarContraseña);


export default autenticacionRouter;