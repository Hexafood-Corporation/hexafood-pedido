import { Categoria } from 'src/pedido/core/domain/entity/categoria.entity';
import { InputCategoriaDto, OutputCategoriaDto } from '../../application/usecases/categoriaUseCases/categoria.dto';

export const ICategoriasRepository = 'ICategoriasRepository';

export interface ICategoriasRepository {
  create(createCategoriaDto: Categoria);

  findAll(): Promise<OutputCategoriaDto[]>;

  existsByName(name: string) : Promise<boolean>;

}
