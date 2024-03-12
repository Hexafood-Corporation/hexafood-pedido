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
    const id = 1;

    await deleteClienteUseCase.execute(id);

    expect(clientesRepository.delete).toHaveBeenCalledWith(id);
  });
});
