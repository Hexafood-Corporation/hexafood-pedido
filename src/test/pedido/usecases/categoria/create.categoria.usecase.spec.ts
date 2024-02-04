import { Categoria } from "../../../../pedido/core/domain/entity/categoria.entity";
import { CategoriaException } from "../../../../pedido/core/application/exceptions/categoria.exception";
import { InputCategoriaDto } from "../../../../pedido/core/application/usecases/categoriaUseCases/categoria.dto";
import { CreateCategoriaUseCase } from "../../../../pedido/core/application/usecases/categoriaUseCases/create.categoria.usecase";
import {MockCategoriasRepository} from "../../MockCategoriasRepository";

describe('CreateCategoriaUseCase', () => {
  let createCategoriaUseCase: CreateCategoriaUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createCategoriaUseCase = new CreateCategoriaUseCase(MockCategoriasRepository);
  });

  it('Deve criar uma nova categoria com sucesso', async () => {
    // Given
    const inputCategoriaDto: InputCategoriaDto = {
      nome: 'Nova Categoria',
    };

    MockCategoriasRepository.existsByName.mockResolvedValue(false);

    const categoriaCriada = {
      id: 1,
      nome: inputCategoriaDto.nome,
    };
    MockCategoriasRepository.create.mockResolvedValue(categoriaCriada);

    // When
    const result: Categoria = await createCategoriaUseCase.execute(inputCategoriaDto);

    // Then
    expect(result).toEqual({
      id: categoriaCriada.id,
      nome: categoriaCriada.nome,
    });

    expect(MockCategoriasRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: inputCategoriaDto.nome,
      }),
    );

    expect(MockCategoriasRepository.existsByName).toHaveBeenCalledWith(
      inputCategoriaDto.nome,
    );
  });

  it('Deve lançar uma exceção ao tentar criar uma categoria com nome já existente', async () => {
    // Given
    const inputCategoriaDto: InputCategoriaDto = {
      nome: 'Categoria Existente',
    };

    MockCategoriasRepository.existsByName.mockResolvedValue(true);

    // When/Then
    await expect(createCategoriaUseCase.execute(inputCategoriaDto)).rejects.toThrowError(
      CategoriaException,
    );

    expect(MockCategoriasRepository.existsByName).toHaveBeenCalledWith(
      inputCategoriaDto.nome,
    );

    expect(MockCategoriasRepository.create).not.toHaveBeenCalled();
  });
});