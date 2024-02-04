import { IProdutosRepository } from '../../../../../pedido/core/domain/repository/produtos.repository';
import { ExistProdutoUseCase } from './exist.produto.usecase';
import { Inject } from '@nestjs/common';
import { ProdutoException } from '../../exceptions/produto.exception';

export class DeleteProdutoUseCase {
  constructor(
    @Inject(IProdutosRepository)
    private produtosRepository: IProdutosRepository, 
    private readonly existProdutoUseCase: ExistProdutoUseCase) 
  {}

  async execute(id: number) {
    const produtoExists = await this.existProdutoUseCase.execute(id);
    if (!produtoExists) {
      throw new ProdutoException('O produto informado não existe.');
    }
    return this.produtosRepository.remove(id);
  }
}

  