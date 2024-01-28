import { FindAllCategoriaUseCase } from '../find.all.categoria.usecase';
import { ICategoriasRepository } from '../../../../domain/repository/categorias.repository';
import { CategoriaException } from '../../../exceptions/categoria.exception';

describe('FindAllCategoriaUseCase', () => {
  let findAllCategoriaUseCase: FindAllCategoriaUseCase;
  let categoriasRepository: ICategoriasRepository;

  beforeEach(() => {
    categoriasRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      existsByName: jest.fn(),
    };
    findAllCategoriaUseCase = new FindAllCategoriaUseCase(categoriasRepository);
  });

  it('should return all categorias', async () => {
    const categorias = [
      { id: 1, nome: 'Categoria 1' },
      { id: 2, nome: 'Categoria 2' },
    ];
    jest.spyOn(categoriasRepository, 'findAll').mockResolvedValue(categorias);

    const result = await findAllCategoriaUseCase.execute();

    expect(result).toEqual(categorias);
    expect(categoriasRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw CategoriaException if no categorias are found', async () => {
    jest
      .spyOn(categoriasRepository, 'findAll')
      .mockRejectedValue(new CategoriaException('Categorias não encontradas'));

    await expect(findAllCategoriaUseCase.execute()).rejects.toThrow(
      CategoriaException,
    );
    await expect(findAllCategoriaUseCase.execute()).rejects.toThrow(
      'Categorias não encontradas',
    );
    expect(categoriasRepository.findAll).toHaveBeenCalledTimes(2);
  });
});
