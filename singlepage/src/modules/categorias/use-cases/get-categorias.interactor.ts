import { UseCase } from '@/kernel/contracts';
import { ResponseApi } from '@/kernel/types';
import { categoria } from '../entities/categoria';
import { CategoriaRepository } from './ports/categoria.repository';

export class GetCategoriasInteractor implements UseCase<void, ResponseApi<categoria[]>> {
    constructor(private readonly repository: CategoriaRepository) {}

    execute(): Promise<ResponseApi<categoria[]>> {
        return this.repository.getCategorias();
    }
}