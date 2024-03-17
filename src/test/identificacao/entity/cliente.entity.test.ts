import { ClienteException } from 'src/identificacao/core/application/exceptions/cliente.exception';
import { Cliente } from '../../../identificacao/core/domain/cliente/entity/cliente.entity';

describe('Cliente', () => {
  let cliente: Cliente;

  beforeEach(() => {
    cliente = new Cliente('John Doe', '12345678901', 'email@email.com');
  });

  it('should create a new Cliente instance', () => {
    expect(cliente).toBeDefined();
    expect(cliente.nome).toBe('John Doe');
    expect(cliente.cpf).toBe('12345678901');
    expect(cliente.email).toBe('email@email.com');

  });

  it('should throw an exception if nome is empty', () => {
    expect(() => {
      new Cliente('', '12345678901', 'email@email.com');
    }).toThrow(ClienteException);
  });

  it('should throw an exception if cpf length is not 11', () => {
    expect(() => {
      new Cliente('John Doe', '123456789', 'email@email.com');
    }).toThrow(ClienteException);
  });
});
