import { ProdutoException } from "../../../../pedido/core/application/exceptions/produto.exception";
import { FindByIdProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/find.by.id.produto.usecase";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('FindByIdProdutoUseCase', () => {
    let findByIdProdutoUseCase: FindByIdProdutoUseCase;
  
    beforeEach(() => {
      findByIdProdutoUseCase = new FindByIdProdutoUseCase(MockProdutosRepository);
    });
  
    it('deve retornar o produto quando ele existe', async () => {
      // Arrange
      const produtoId = 1;
      const mockProduto = { id: produtoId, nome: 'Produto 1', valor: 10.0, id_categoria: 1, descricao: 'Descrição 1', imagem: 'imagem1' };
      MockProdutosRepository.findById.mockResolvedValue(mockProduto);
  
      // Act
      const result = await findByIdProdutoUseCase.execute(produtoId);
  
      // Assert
      expect(result).toEqual(mockProduto);
      expect(MockProdutosRepository.findById).toHaveBeenCalledWith(produtoId);
    });
  
    it('deve lançar uma exceção quando o produto não existe', async () => {
      // Arrange
      const produtoId = 1;
      MockProdutosRepository.findById.mockResolvedValue(null);
  
      // Act/Assert
      await expect(findByIdProdutoUseCase.execute(produtoId)).rejects.toThrowError(ProdutoException);
      expect(MockProdutosRepository.findById).toHaveBeenCalledWith(produtoId);
    });
  });