import { IClientesRepository } from '../../../identificacao/core/domain/cliente/repository/clientes.repository';

export const MockClientesRepository: jest.Mocked<IClientesRepository> = {
  create: jest.fn(),
  findUnique: jest.fn(),
  existsByCpf: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
};

export default MockClientesRepository;
