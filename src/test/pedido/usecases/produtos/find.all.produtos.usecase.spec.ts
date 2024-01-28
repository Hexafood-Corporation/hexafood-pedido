import { ProdutoException } from "../../../../pedido/core/application/exceptions/produto.exception";
import { FindAllProdutosUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/find.all.produtos.usecase";
import { Produto } from "../../../../pedido/core/domain/entity/produto.entity";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('FindAllProdutosUseCase', () => {
    let findAllProdutosUseCase: FindAllProdutosUseCase;
  
    beforeEach(() => {        
      findAllProdutosUseCase = new FindAllProdutosUseCase(MockProdutosRepository);
    });
  
    it('deve retornar a lista de produtos quando existem produtos cadastrados', async () => {
      // Arrange
      const mockProdutos: Produto[] = [
        { id: 1, nome: 'Produto 1', valor: 10.0, id_categoria: 1, descricao: 'Descrição 1', imagem: 'imagem1' },
        { id: 2, nome: 'Produto 2', valor: 15.0, id_categoria: 2, descricao: 'Descrição 2', imagem: 'imagem2' },
      ];
      
      MockProdutosRepository.findAll.mockResolvedValue(mockProdutos);
  
      // Act
      const result = await findAllProdutosUseCase.execute();
  
      // Assert
      expect(result).toEqual(mockProdutos);
      expect(MockProdutosRepository.findAll).toHaveBeenCalled();
    });
  
    it('deve lançar uma exceção quando não há produtos cadastrados', async () => {
      // Arrange
      MockProdutosRepository.findAll.mockRejectedValue(new ProdutoException('Não há produtos cadastrados.'));
    
      // Act/Assert
      await expect(findAllProdutosUseCase.execute()).rejects.toThrowError(ProdutoException);
      expect(MockProdutosRepository.findAll).toHaveBeenCalled();
    });
  });