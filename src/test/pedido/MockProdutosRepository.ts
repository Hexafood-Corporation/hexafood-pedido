import { IProdutosRepository } from "../../pedido/core/domain/repository/produtos.repository";

export const MockProdutosRepository: jest.Mocked<IProdutosRepository> = {
    createManyProdutos: jest.fn(),
    findAll: jest.fn(),
    findByIdCategoria: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByIds: jest.fn(),
    findById: jest.fn(),
};

export default MockProdutosRepository;