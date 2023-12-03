import { ResponseApi } from "@/kernel/types";
import { MunicipioRepository } from "../use-cases/ports/municipios.repository";
import { MunicipioStorageGateway } from "./municipio.storage.gateway";
import { GetMunicipiosInteractor } from "../use-cases/get-municipios.interactor";
import { RegistrarMunicipioDTO } from "./dtos/registrar-municipio.dto";
import { RegistrarMunicipioInteractor } from "../use-cases/registrar-municipio.interactor";
import { CambiarEstadoMunicipioDTO } from "./dtos/cambiar-estado-municipio.dto";
import { CambiarEstadoMunicipioInteractor } from "../use-cases/cambiar-estado-municipio";
import { ModificarMunicipioDTO } from "./dtos/modificar-municipio.dto";
import { ModificarMunicipioInteractor } from "../use-cases/modificar-municipio.interactor";
import { GetMunicipiosPorEntidadInteractor } from "../use-cases/get-municipios-por-entidad.interactor";
import { BuscarMunicipioPorNombreInteractor } from "../use-cases/buscar-municipio-por-nombre.interactor";

export class MunicipioController {
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message,
        } as ResponseApi<any>;
    }

    getMunicipios = async () => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const getMunicipiosInteractor = new GetMunicipiosInteractor(repositorio);

            const respuesta = await getMunicipiosInteractor.execute();

            return respuesta;

        } catch (error) {
            return this.obtenerError(error);
        }
    };

    getMunicipiosPorEntidad = async (fk_idEntidad: number) => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const getMunicipiosPorEntidadInteractor = new GetMunicipiosPorEntidadInteractor(repositorio);

            const respuesta = await getMunicipiosPorEntidadInteractor.execute(fk_idEntidad);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    };

    buscarMunicipioPorNombre = async (nombre:string) => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const buscarMunicipioPorNombreInteractor = new BuscarMunicipioPorNombreInteractor(repositorio);

            const respuesta = await buscarMunicipioPorNombreInteractor.execute(nombre);

            return respuesta;

        } catch (error) {
            return this.obtenerError(error);
        }
    }

    registrarMunicipio = async (payload: RegistrarMunicipioDTO) => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const registrarMunicipioInteractor = new RegistrarMunicipioInteractor(repositorio);

            const respuesta = await registrarMunicipioInteractor.execute(payload);

            return respuesta;

        } catch (error) {
            return this.obtenerError(error);
        }
    }

    modificarMunicipio = async (payload: ModificarMunicipioDTO) => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const modificarMunicipioInteractor = new ModificarMunicipioInteractor(repositorio);

            const respuesta = await  modificarMunicipioInteractor.execute(payload);

            return respuesta;

        } catch (error) {
            return this.obtenerError(error);
        }
    }

    cambiarEstadoMunicipio = async (payload: CambiarEstadoMunicipioDTO) => {
        try {
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const cambiarEstadoMunicipioInteractor = new CambiarEstadoMunicipioInteractor(repositorio);

            const respuesta = await cambiarEstadoMunicipioInteractor.execute(payload);

            return respuesta;

        } catch (error) {
            return this.obtenerError(error);
        }
    }
}