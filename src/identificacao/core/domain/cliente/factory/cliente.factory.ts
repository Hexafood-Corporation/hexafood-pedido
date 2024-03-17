import { ClientesController } from 'src/identificacao/infrastructure/controller/clientes.controller';
import { Cliente } from '../entity/cliente.entity';

export class ClienteFactory {
  static create(data: any): Cliente {
    const cliente = new Cliente(data.nome, data.cpf, data.email);
    cliente.id = data.id || null;
    cliente.createdAt = data.createdAt || null;
    cliente.email = data.email
    return cliente;
  }
}
