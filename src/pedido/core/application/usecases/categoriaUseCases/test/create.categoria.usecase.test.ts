import { ICategoriasRepository } from 'src/pedido/core/domain/repository/categorias.repository';
import { CreateCategoriaUseCase } from '../create.categoria.usecase';

describe('CreateCategoriaUseCase', () => {
  let createCategoriaUseCase: CreateCategoriaUseCase;
  let categoriasRepository: ICategoriasRepository;

  beforeEach(() => {
    categoriasRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      existsByName: jest.fn(),
    };
    createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository);
  });

  it('should create a new categoria', async () => {
    const categoriaData = {
      nome: 'Categoria 1',
    };

    await createCategoriaUseCase.execute(categoriaData);

    expect(categoriasRepository.create).toHaveBeenCalledWith(categoriaData);
  });
});
