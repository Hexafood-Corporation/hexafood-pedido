import { ExistProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/exist.produto.usecase";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('ExistProdutoUseCase', () => {
    let existProdutoUseCase: ExistProdutoUseCase;
  
    beforeEach(() => {

      existProdutoUseCase = new ExistProdutoUseCase(MockProdutosRepository);
    });
  
    it('deve retornar true se o produto existir', async () => {
      // Arrange
      const produtoId = 1;
      const mockProduto = { id: produtoId, nome: 'Produto Teste', valor: 10.0 };
      MockProdutosRepository.findById.mockResolvedValue(mockProduto);
  
      // Act
      const result = await existProdutoUseCase.execute(produtoId);
  
      // Assert
      expect(result).toBe(true);
      expect(MockProdutosRepository.findById).toHaveBeenCalledWith(produtoId);
    });
  
    it('deve retornar false se o produto não existir', async () => {
      // Arrange
      const produtoId = 2;
      MockProdutosRepository.findById.mockResolvedValue(null);
  
      // Act
      const result = await existProdutoUseCase.execute(produtoId);
  
      // Assert
      expect(result).toBe(false);
      expect(MockProdutosRepository.findById).toHaveBeenCalledWith(produtoId);
    });
  });