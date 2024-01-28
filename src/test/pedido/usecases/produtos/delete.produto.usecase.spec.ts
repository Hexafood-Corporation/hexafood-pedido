import { ProdutoException } from "../../../../pedido/core/application/exceptions/produto.exception";
import { DeleteProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/delete.produto.usecase";
import { ExistProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/exist.produto.usecase";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('DeleteProdutoUseCase', () => {
    let deleteProdutoUseCase: DeleteProdutoUseCase;
    let existProdutoUseCaseMock: jest.Mocked<ExistProdutoUseCase>;
  
    beforeEach(() => {
      existProdutoUseCaseMock = {
        execute: jest.fn(),
      } as unknown as jest.Mocked<ExistProdutoUseCase>;
  
      deleteProdutoUseCase = new DeleteProdutoUseCase(MockProdutosRepository, existProdutoUseCaseMock);
    });
  
    it('deve remover o produto se ele existir', async () => {
      // Arrange
      const produtoId = 1;
      existProdutoUseCaseMock.execute.mockResolvedValue(true);
  
      // Act
      await deleteProdutoUseCase.execute(produtoId);
  
      // Assert
      expect(existProdutoUseCaseMock.execute).toHaveBeenCalledWith(produtoId);
      expect(MockProdutosRepository.remove).toHaveBeenCalledWith(produtoId);
    });
  

    it('deve lançar uma exceção se o produto não existir', async () => {
      // Arrange
      const produtoId = 1;
    
      existProdutoUseCaseMock.execute.mockResolvedValue(false);
    
      // Act/Assert
      await expect(deleteProdutoUseCase.execute(produtoId)).rejects.toThrowError(ProdutoException);
      expect(existProdutoUseCaseMock.execute).toHaveBeenCalledWith(produtoId);
    });
    
  });


