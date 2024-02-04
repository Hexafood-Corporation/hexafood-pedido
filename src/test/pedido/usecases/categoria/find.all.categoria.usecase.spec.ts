import { CategoriaException } from "../../../../pedido/core/application/exceptions/categoria.exception";
import { FindAllCategoriaUseCase } from "../../../../pedido/core/application/usecases/categoriaUseCases/find.all.categoria.usecase";
import { MockCategoriasRepository } from "../../MockCategoriasRepository";

describe('FindAllCategoriaUseCase', () => {
  let findAllCategoriaUseCase: FindAllCategoriaUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    findAllCategoriaUseCase = new FindAllCategoriaUseCase(MockCategoriasRepository);
  });

  it('Deve retornar todas as categorias com sucesso', async () => {
    // Given
    const categoriasSimuladas = [
      { id: 1, nome: 'Categoria 1' },
      { id: 2, nome: 'Categoria 2' },
    ];

    MockCategoriasRepository.findAll.mockResolvedValue(categoriasSimuladas);

    // When
    const result = await findAllCategoriaUseCase.execute();

    // Then
    expect(result).toEqual(categoriasSimuladas);

    expect(MockCategoriasRepository.findAll).toHaveBeenCalled();
  });

  it('Deve lançar uma exceção ao tentar buscar todas as categorias quando não há nenhuma cadastrada', async () => {
    MockCategoriasRepository.findAll.mockResolvedValue([]);

    // When/Then
    await expect(findAllCategoriaUseCase.execute()).rejects.toThrowError(
      CategoriaException,
    );

    expect(MockCategoriasRepository.findAll).toHaveBeenCalled();
  });
});