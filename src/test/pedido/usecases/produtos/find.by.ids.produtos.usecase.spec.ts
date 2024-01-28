import { ProdutoException } from "../../../../pedido/core/application/exceptions/produto.exception";
import { FindByIdsProdutosUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/find.by.ids.produtos.usecase";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('FindByIdsProdutosUseCase', () => {
    let findByIdsProdutosUseCase: FindByIdsProdutosUseCase;
  
    beforeEach(() => {
  
      findByIdsProdutosUseCase = new FindByIdsProdutosUseCase(MockProdutosRepository);
    });
    it('deve retornar os produtos corretos quando existirem', async () => {
        // Arrange
        const ids = [1, 2, 3];
        const mockProdutos = [
          { id: 1, nome: 'Produto 1' },
          { id: 2, nome: 'Produto 2' },
          { id: 3, nome: 'Produto 3' },
        ];
      
        MockProdutosRepository.findByIds.mockResolvedValue(mockProdutos);
      
        // Act
        const result = await findByIdsProdutosUseCase.execute(ids);
            
        // Assert
        expect(result).toEqual(mockProdutos);
        expect(MockProdutosRepository.findByIds).toHaveBeenCalledWith(ids);
      });
  
    it('deve lançar uma exceção quando algum produto não existir', async () => {
      // Arrange
      const ids = [1, 2, 3];
      const mockProdutos = [
        { id: 1, nome: 'Produto 1' },
        null,
        { id: 3, nome: 'Produto 3' },
      ];
  
      MockProdutosRepository.findByIds.mockResolvedValue(mockProdutos);
  
      // Act/Assert
      await expect(findByIdsProdutosUseCase.execute(ids)).rejects.toThrowError(ProdutoException);
      expect(MockProdutosRepository.findByIds).toHaveBeenCalledWith(ids);
    });
  });