import { Request, Response, Router } from "express";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { CategoriaStorageGateway } from "./categoria.storage.gateway";
import { ResponseApi } from "src/kernel/types";
import { InsertCategoriaInteractor } from "../use-cases/insert-categoria.interactor";
import { GetCategoriasInteractor } from "../use-cases/get-categorias.interactor";
import { categoria } from "../entities/categoria";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { ModificarCategoriaInteractor } from "../use-cases/modify-categoria";
import { validarError } from "src/kernel/error-handler";

const categoriaRouter = Router();

export class CategoriaController {

    getError(error:any){
        const body: ResponseApi<null> = {
            data: null,
            message: error.message,
            error: true,
            status: 500,
        } 
        return body;
    }

    getCategoria = async (_req:Request, res:Response) => {
        try {
            const repository:CategoriaRepository = new CategoriaStorageGateway();
            const interactor = new GetCategoriasInteractor(repository);

            const result = await interactor.execute(null);

            const body: ResponseApi<categoria[]> = {
                data: result,
                message: 'Las categorias han sido encontrados esplendidamente',
                error: false,
                status: 200,
            }

            return res.status(body.status).json(body);
        } catch(error){
            const body = this.getError(error);

            return res.status(body.status).json(body);
        }
    }

    insertCategoria = async (_req:Request, res:Response) => {
        try {
            const payload = _req.body as insertCategoriaDto;

            if (!payload.nombre_categoria) {
                throw new Error("Campos requeridos incompletos");
              }

            const repository:CategoriaRepository = new CategoriaStorageGateway();
            const interactor = new InsertCategoriaInteractor(repository);

            const result = await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: result,
                message: 'La categoria a sido registrada esplendidamente',
                error: false,
                status: 200,
            }

            res.status(body.status).json(body);

        } catch(error){
            const body = this.getError(error);

            res.status(body.status).json(body);
        }
    }

    modificarCategoria = async (req: Request, res: Response) => {
        try {
          const payload = req.body as modifyCategoriaDTO;
    
          if (!payload.nombre_categoria || !payload.id_categoria) {
            throw new Error("Campos requeridos incompletos");
          }
    
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

}

const categoriaController = new CategoriaController();

categoriaRouter.get('/categorias', categoriaController.getCategoria);
categoriaRouter.post('/categorias', categoriaController.insertCategoria);
categoriaRouter.put('/categorias', categoriaController.modificarCategoria);

export default categoriaController;