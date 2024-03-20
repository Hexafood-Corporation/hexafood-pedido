import { ClienteException } from '../../../application/exceptions/cliente.exception';

export class Cliente {
  id?: number;

  nome: string;

  cpf: string;

  email: string;

  createdAt?: Date;

  constructor(nome: string, cpf: string, email: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.validate();
  }

  validate() {
    if (!this.nome || this.nome.trim() === '') {
      throw new ClienteException('O nome não pode ser vazio');
    }
    if (this.cpf.length !== 11) {
      throw new ClienteException('CPF do cliente deve ter 11 caracteres');
    }
    if (!this.email || this.email.trim() === '') {
      throw new ClienteException('O email não pode ser vazio');
    }
  }
}
