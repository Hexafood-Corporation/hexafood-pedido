import { Produto } from '../../../../pedido/core/domain/entity/produto.entity';
import { ProdutoException } from '../../../../pedido/core/application/exceptions/produto.exception';
import { FindByIdCategoriaUseCase } from '../../../../pedido/core/application/usecases/categoriaUseCases/find.by.categoria.produto.usecase';
import { MockProdutosRepository } from '../../MockProdutosRepository';

describe('FindByIdCategoriaUseCase', () => {
  let findByIdCategoriaUseCase: FindByIdCategoriaUseCase;

  beforeEach(() => {
    findByIdCategoriaUseCase = new FindByIdCategoriaUseCase(MockProdutosRepository);
  });

  it('Deve retornar produtos quando a categoria existe', async () => {
    // Given
    const idCategoria = 1;
    const produtosSimulados = [
      { id: 1, nome: 'Produto 1' },
      { id: 2, nome: 'Produto 2' },
    ];

    MockProdutosRepository.findByIdCategoria.mockResolvedValue(produtosSimulados as Produto[]);

    // When
    const result = await findByIdCategoriaUseCase.execute(idCategoria);

    // Then
    expect(result).toEqual(produtosSimulados);

    // Verificar que o método findByIdCategoria foi chamado
    expect(MockProdutosRepository.findByIdCategoria).toHaveBeenCalledWith(idCategoria);
  });

  it('Deve lançar uma exceção ao tentar buscar produtos de uma categoria que não existe', async () => {
    // Given
    const idCategoria = 1;

    MockProdutosRepository.findByIdCategoria.mockResolvedValue([]);

    // When/Then
    await expect(findByIdCategoriaUseCase.execute(idCategoria)).rejects.toThrowError(
      ProdutoException,
    );

    // Verificar que o método findByIdCategoria foi chamado
    expect(MockProdutosRepository.findByIdCategoria).toHaveBeenCalledWith(idCategoria);
  });
});