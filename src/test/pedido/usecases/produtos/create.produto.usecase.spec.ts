import { ProdutoException } from '../../../../pedido/core/application/exceptions/produto.exception';
import { FindAllCategoriaUseCase } from '../../../../pedido/core/application/usecases/categoriaUseCases/find.all.categoria.usecase';
import { CreateProdutoUseCase } from '../../../../pedido/core/application/usecases/produtoUseCase/create.produto.usecase';
import { InputProdutoDto } from '../../../../pedido/core/application/usecases/produtoUseCase/produto.dto';
import MockProdutosRepository from '../../MockProdutosRepository';

describe('CreateProdutoUseCase', () => {
  let createProdutoUseCase: CreateProdutoUseCase;
  let mockFindAllCategoriaUseCase: jest.Mocked<FindAllCategoriaUseCase>

  beforeEach(() => {
    jest.clearAllMocks();

    mockFindAllCategoriaUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindAllCategoriaUseCase>;
  
    createProdutoUseCase = new CreateProdutoUseCase(MockProdutosRepository, mockFindAllCategoriaUseCase);
  });
  
  it('deve criar produtos com sucesso', async () => {
    // Arrange
    const produtosDto: InputProdutoDto[] = [
      { id_categoria: 1, nome: 'Produto 1', valor: 10.21, descricao: "descrição de produto 1", imagem: "caminhoproduto1"},
      { id_categoria: 2, nome: 'Produto 2', valor: 15.21, descricao: "descrição de produto 2", imagem: "caminhoproduto2"},
    ];
  
      mockFindAllCategoriaUseCase.execute.mockResolvedValue([
        { id: 1, nome: 'Categoria 1' },
        { id: 2, nome: 'Categoria 2' },
      ]);
  
    MockProdutosRepository.createManyProdutos.mockResolvedValue([
        { id_categoria: 1, nome: 'Produto 1', valor: 10.21, descricao: "descrição de produto 1", imagem: "caminhoproduto1"},
        { id_categoria: 2, nome: 'Produto 2', valor: 15.21, descricao: "descrição de produto 2", imagem: "caminhoproduto2"},
    ]);

    // Act
    const result = await createProdutoUseCase.execute(produtosDto);

    // Assert
    expect(result).toEqual([
        { id_categoria: 1, nome: 'Produto 1', valor: 10.21, descricao: "descrição de produto 1", imagem: "caminhoproduto1"},
        { id_categoria: 2, nome: 'Produto 2', valor: 15.21, descricao: "descrição de produto 2", imagem: "caminhoproduto2"},
    ]);
    expect(mockFindAllCategoriaUseCase.execute).toHaveBeenCalled();
    expect(MockProdutosRepository.createManyProdutos).toHaveBeenCalledWith(produtosDto);
    
  });

  it('deve lançar uma exceção se a categoria não existir', async () => {
    // Arrange
    const produtosDto: InputProdutoDto[] = [
      { id_categoria: 1, nome: 'Produto 1', valor: 10.21, descricao: 'descrição de produto 1', imagem: 'caminhoproduto1' },
      { id_categoria: 3, nome: 'Produto 2', valor: 15.21, descricao: 'descrição de produto 2', imagem: 'caminhoproduto2' }, 
    ];

    mockFindAllCategoriaUseCase.execute.mockResolvedValue([
      { id: 1, nome: 'Categoria 1' },
      { id: 2, nome: 'Categoria 2' },
    ]);

    // Act/Assert
    await expect(createProdutoUseCase.execute(produtosDto)).rejects.toThrowError(
      ProdutoException,
    );
  });


  it('deve lançar uma exceção se algum campo do produto for vazio', async () => {
    // Arrange
    const produtosDto: InputProdutoDto[] = [
        { id_categoria: 1, nome: 'Produto 1', valor: 10.21, descricao: "descrição de produto 1", imagem: "caminhoproduto1"},
        { id_categoria: 2, nome: '', valor: 15.21, descricao: "descrição de produto 2", imagem: "caminhoproduto2"},
    ];

    // Act/Assert
    await expect(createProdutoUseCase.execute(produtosDto)).rejects.toThrowError(
      ProdutoException,
    );
  });

});