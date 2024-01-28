import { ICategoriasRepository } from '../../../domain/repository/categorias.repository';
import { CategoriaException } from '../../exceptions/categoria.exception';
import { Inject } from '@nestjs/common';

export class FindAllCategoriaUseCase {
  constructor(
    @Inject('ICategoriasRepository')
    private categoriasRepository: ICategoriasRepository
  ) {}

  async execute() {
    const categorias = await this.categoriasRepository.findAll();

    if (!categorias || categorias.length === 0) {
      throw new CategoriaException('Não há nenhuma categoria cadastrada');
    }

    return categorias;
  }
}