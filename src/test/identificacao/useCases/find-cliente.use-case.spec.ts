import { ClienteException } from '../../../identificacao/core/application/exceptions/cliente.exception';
import { MockClientesRepository } from './MockClientesRepository';
import { FindClienteUseCase } from '../../../identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { Cliente } from '../../../identificacao/core/domain/cliente/entity/cliente.entity';

describe('FindClienteUseCase', () => {
  let findClienteUseCase: FindClienteUseCase;

  beforeEach(() => {
    findClienteUseCase = new FindClienteUseCase(MockClientesRepository);
  });

  it('Deve encontrar um cliente por id', async () => {

    const cliente = {
      id: 1,
      nome: 'Cliente Teste',
      cpf: '12345678901',
    };
    
    MockClientesRepository.findById.mockResolvedValue(cliente as Cliente);

    const result = await findClienteUseCase.execute(1);

    expect(MockClientesRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(cliente);
    
  });

  it('Deve lançar uma exceção se o cliente não for encontrado', async () => {

    const cliente = {
      id: 1,
      nome: 'Cliente Teste',
      cpf: '12345678901',
    };
    
    MockClientesRepository.findById.mockRejectedValue(new ClienteException('Cliente não encontrado'));

    await expect(findClienteUseCase.execute(cliente.id)).rejects.toThrowError(ClienteException);

    expect(MockClientesRepository.findById).toHaveBeenCalledWith(1);
  });
});


