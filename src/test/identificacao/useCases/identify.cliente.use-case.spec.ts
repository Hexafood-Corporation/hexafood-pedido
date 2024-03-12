import { IndentifyClienteUseCase } from '../../../identificacao/core/application/usecases/cliente/identify.cliente.usecase';
import { ClienteException } from '../../../identificacao/core/application/exceptions/cliente.exception';
import { Cliente } from '../../../identificacao/core/domain/cliente/entity/cliente.entity';
import MockClientesRepository from './MockClientesRepository';

describe('IndentifyClienteUseCase', () => {
  let identifyClienteUseCase: IndentifyClienteUseCase;

  beforeEach(() => {
    identifyClienteUseCase = new IndentifyClienteUseCase(
      MockClientesRepository,
    );
  });

  it('Deve retornar o cliente se o CPF for encontrado', async () => {
    const cliente = {
      id: 1,
      nome: 'Cliente Teste',
      cpf: '12345678901',
    };
    MockClientesRepository.findUnique.mockResolvedValue(cliente as Cliente);

    const result = await identifyClienteUseCase.execute('12345678901');

    expect(MockClientesRepository.findUnique).toHaveBeenCalledWith(
      '12345678901',
    );
    expect(result).toEqual(cliente);
  });

  it('Deve lançar uma exceção se o CPF não for encontrado', async () => {
    MockClientesRepository.findUnique.mockResolvedValue(null);

    await expect(
      identifyClienteUseCase.execute('12345678901'),
    ).rejects.toThrowError(ClienteException);

    expect(MockClientesRepository.findUnique).toHaveBeenCalledWith(
      '12345678901',
    );
  });
});
