import { ClienteException } from '../../../identificacao/core/application/exceptions/cliente.exception';
import { CreateClienteUseCase } from '../../../identificacao/core/application/usecases/cliente/create.cliente.usecase';
import { MockClientesRepository } from './MockClientesRepository';
import { Cliente } from '../../../identificacao/core/domain/cliente/entity/cliente.entity';
import { InputClienteDto, OutputClienteDto } from '../../../identificacao/core/application/usecases/cliente/cliente.dto';
import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';

describe('CreateClienteUseCase', () => {
  let createClienteUseCase: CreateClienteUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createClienteUseCase = new CreateClienteUseCase(MockClientesRepository);
  });

  it('Deverá criar um novo cliente com sucesso', async () => {
    // Given
    const inputClienteDto: InputClienteDto = {
      nome: 'Nome do Cliente',
      cpf: '12345678901',
      email: 'teste@email.com'
    };

    // Configurar o mock para retornar `false` ao verificar se o CPF existe
    MockClientesRepository.existsByCpf.mockResolvedValue(false);

    const clienteCriado = {
      id: 1,
      nome: inputClienteDto.nome,
      cpf: inputClienteDto.cpf,
    };
    MockClientesRepository.create.mockResolvedValue(clienteCriado);

    // When
    const result: OutputClienteDto = await createClienteUseCase.execute(inputClienteDto);

    // Then
    expect(result).toEqual({
      id: clienteCriado.id,
      nome: clienteCriado.nome,
      cpf: clienteCriado.cpf,
    });

    expect(MockClientesRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: inputClienteDto.nome,
        cpf: inputClienteDto.cpf,
      }),
    );

    expect(MockClientesRepository.existsByCpf).toHaveBeenCalledWith(inputClienteDto.cpf);
  });

  it('Deve lançar uma exceção ao tentar criar um cliente com CPF já existente', async () => {
    // Given
    const inputClienteDto: InputClienteDto = {
      nome: 'Nome do Cliente',
      cpf: '12345678901',
    };

    MockClientesRepository.existsByCpf.mockResolvedValue(true);

    // When/Then
    await expect(createClienteUseCase.execute(inputClienteDto)).rejects.toThrowError(
      ClienteException,
    );

    expect(MockClientesRepository.existsByCpf).toHaveBeenCalledWith(inputClienteDto.cpf);
    expect(MockClientesRepository.create).not.toHaveBeenCalled();
  });
  

  // it('Deverá retornar erro para CPF maior que 11 dígitos.', async () => {
  //   // Given
  //   const inputClienteDto = gerarClienteCpfMaiorQue11Digitos();
  //   expect(() => new Cliente(inputClienteDto.nome, inputClienteDto.cpf)).toThrowError(ClienteException);
  // });


});



function gerarCliente(): InputClienteDto {
  
  const cliente = new InputClienteDto();
  cliente.nome = "Nome de teste";
  cliente.cpf = "20235454842";

  return cliente;
}

function gerarClienteCpfMaiorQue11Digitos(): InputClienteDto {
  
  const cliente = new InputClienteDto();
  cliente.nome = "Nome de teste";
  cliente.cpf = "202354548454872";

  return cliente;
}