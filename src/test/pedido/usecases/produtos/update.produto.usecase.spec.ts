import { ProdutoException } from "../../../../pedido/core/application/exceptions/produto.exception";
import { ExistProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/exist.produto.usecase";
import { InputProdutoDto } from "../../../../pedido/core/application/usecases/produtoUseCase/produto.dto";
import { UpdateProdutoUseCase } from "../../../../pedido/core/application/usecases/produtoUseCase/update.produto.usecase";
import MockProdutosRepository from "../../MockProdutosRepository";

describe('UpdateProdutoUseCase', () => {
    let updateProdutoUseCase: UpdateProdutoUseCase;
    let existProdutoUseCaseMock: jest.Mocked<ExistProdutoUseCase>;
  
    beforeEach(async () => {
        existProdutoUseCaseMock = {
            execute: jest.fn(),
          } as unknown as jest.Mocked<ExistProdutoUseCase>;
      
          updateProdutoUseCase = new UpdateProdutoUseCase(
            MockProdutosRepository,
            existProdutoUseCaseMock,
          );
    });
  
    it('deve lançar uma exceção se o produto não existir', async () => {
        // Arrange
        existProdutoUseCaseMock.execute.mockResolvedValue(false);
        const produtoId = 1;
        const produtoDto: InputProdutoDto = {
          id_categoria: 1,
          nome: 'Produto Atualizado',
          valor: 20.5,
          descricao: 'Descrição do produto atualizado',
          imagem: 'caminho_atualizado',
        };
      
        existProdutoUseCaseMock.execute.mockRejectedValue(new ProdutoException('Produto não encontrado'));
      
        // Act/Assert
        await expect(updateProdutoUseCase.execute(produtoId, produtoDto)).rejects.toThrowError(ProdutoException);
        expect(MockProdutosRepository.update).not.toHaveBeenCalled();
      });
  
      it('deve chamar o método update do repositório se o produto existir', async () => {
        // Arrange
        existProdutoUseCaseMock.execute.mockResolvedValue(true);
        const produtoId = 1;
        const produtoDto: InputProdutoDto = {
          id_categoria: 1,
          nome: 'Produto Atualizado',
          valor: 20.5,
          descricao: 'Descrição do produto atualizado',
          imagem: 'caminho_atualizado',
        };
      
        // Act
        await updateProdutoUseCase.execute(produtoId, produtoDto);
      
        // Assert
        expect(MockProdutosRepository.update).toHaveBeenCalledWith(produtoId, produtoDto);
      });
  });

