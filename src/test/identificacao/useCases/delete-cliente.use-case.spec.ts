import { DeleteClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/delete.cliente.usecase';
import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';

describe('DeleteClienteUseCase', () => {
  let deleteClienteUseCase: DeleteClienteUseCase;
  let clientesRepository: IClientesRepository;

  beforeEach(() => {
    clientesRepository = {
      delete: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      existsByCpf: jest.fn(),
      findById: jest.fn(),
    } as IClientesRepository;
    deleteClienteUseCase = new DeleteClienteUseCase(clientesRepository);
  });

  it('Deve deletar um cliente por id', async () => {
    const cliente = {
      id: 1,
      nome: 'Cliente Teste',
      cpf: '12345678901',
    };

    clientesRepository.findById = jest.fn().mockResolvedValue(cliente);

    await deleteClienteUseCase.execute(cliente.id);

    expect(clientesRepository.delete).toHaveBeenCalledWith(cliente.id);
  });

  it('Deve retornar erro ao tentar deletar um cliente que não existe', async () => {
    const cliente = {
      id: 1,
      nome: 'Cliente Test',
      cpf: '12345678901',
    };

    clientesRepository.findById = jest.fn().mockResolvedValue(undefined);

    try {
      await deleteClienteUseCase.execute(cliente.id);
    } catch (error) {
      expect(error.message).toBe('Cliente não cadastrado');
    }
  });
});
