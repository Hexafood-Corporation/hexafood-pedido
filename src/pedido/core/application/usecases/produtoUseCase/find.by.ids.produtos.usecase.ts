import { IProdutosRepository } from '../../../domain/repository/produtos.repository';
import { ProdutoException } from '../../exceptions/produto.exception';
import { Inject } from '@nestjs/common';

export class FindByIdsProdutosUseCase {
  constructor(
    @Inject('IProdutosRepository')
        private produtosRepository: IProdutosRepository) {}

  async execute(ids: number[]) {
    const produtos = await this.produtosRepository.findByIds(ids);

    if (produtos.some((produto) => produto === null)) {
      throw new ProdutoException('Pelo menos um produto informado não existe.');
    }

    return produtos;
  }
}


