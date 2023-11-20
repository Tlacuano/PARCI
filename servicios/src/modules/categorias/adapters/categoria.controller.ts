import { Request, Response, Router } from "express";
import { CategoriaStorageGateway } from "./categoria.storage.gateway";
import { ResponseApi } from "../../../kernel/types";
import { InsertCategoriaInteractor } from "../use-cases/insert-categoria.interactor";
import { GetCategoriasInteractor } from "../use-cases/get-categorias.interactor";
import { categoria } from "../entities/categoria";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { ModificarCategoriaInteractor } from "../use-cases/modificar-categoria.interactor";
import { validarError } from "../../../kernel/error-handler";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { modificarEstadoCategoriaDTO } from "./dtos/modificar-estado-categoria";
import { ModificarEstadoCategoriaInteractor } from "../use-cases/modificar-estado-categoria.interactor";

const categoriaRouter = Router();

export class CategoriaController {

    getCategoria = async (_req:Request, res:Response) => {
        try {
            const repositorio:CategoriaRepository = new CategoriaStorageGateway();
            const getCategoriaInteractor = new GetCategoriasInteractor(repositorio);

            const categorias = await getCategoriaInteractor.execute(null);

            const body: ResponseApi<categoria[]> = {
                data: categorias,
                message: 'Las categorias han sido encontrados esplendidamente',
                error: false,
                status: 200,
            }

            res.status(body.status).json(body);
        } catch(error){
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    insertCategoria = async (_req:Request, res:Response) => {
        try {
            const payload = _req.body as insertCategoriaDto;

            const repository:CategoriaRepository = new CategoriaStorageGateway();
            const interactor = new InsertCategoriaInteractor(repository);

            await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'La categoria a sido registrada esplendidamente',
                error: false,
                status: 200,
            }

            res.status(body.status).json(body);

        } catch(error){
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    modificarCategoria = async (req: Request, res: Response) => {
        try {
          const payload = req.body as modifyCategoriaDTO;
    
          const repositorio: CategoriaRepository = new CategoriaStorageGateway();
          const modificarCategoriaInteractor = new ModificarCategoriaInteractor(repositorio);
    
          await modificarCategoriaInteractor.execute(payload);
    
          const body: ResponseApi<boolean> = {
            data: true,
            message: "Categoria modificada correctamente",
            status: 200,
            error: false,
          };
    
          res.status(body.status).json(body);
        } catch (error) {
          const errorBody = validarError(error as Error);
          res.status(errorBody.status).json(errorBody);
        }
      }

      modificarEstadoCategoria = async (_req: Request, _res: Response) => {
        try{
            const payload = _req.body as modificarEstadoCategoriaDTO;

            const repository:CategoriaRepository = new CategoriaStorageGateway();
            const interactor = new ModificarEstadoCategoriaInteractor(repository);

            await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Se a modificado el estado del reporte',
                error: false,
                status: 200, 
            };

            _res.status(body.status).json(body);
        
        } catch (error){
            const errorBody = validarError(error as Error);
            _res.status(errorBody.status).json(errorBody);
        }
    }

}

const categoriaController = new CategoriaController();

categoriaRouter.get('/consultar', categoriaController.getCategoria);
categoriaRouter.post('/registrar', categoriaController.insertCategoria);
categoriaRouter.put('/modificar', categoriaController.modificarCategoria);
categoriaRouter.put('/modificar-estado', categoriaController.modificarEstadoCategoria);

export default categoriaRouter;