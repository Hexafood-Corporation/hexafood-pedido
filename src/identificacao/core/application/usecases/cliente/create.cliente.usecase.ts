import { IClientesRepository } from '../../../domain/cliente/repository/clientes.repository';
import { Inject } from '@nestjs/common';
import { InputClienteDto, OutputClienteDto } from './cliente.dto';
import { ClienteException } from '../../exceptions/cliente.exception';
import { Cliente } from '../../../domain/cliente/entity/cliente.entity';

export class CreateClienteUseCase {
  constructor(
    @Inject('IClientesRepository')
    private clientesRepository: IClientesRepository,
  ) {}

  async execute(data: InputClienteDto): Promise<OutputClienteDto> {
    const exists = await this.clientesRepository.existsByCpf(data.cpf);
    if (exists) {
      throw new ClienteException('Cliente já cadastrado');
    }
    const cliente = await this.clientesRepository.create(
      new Cliente(data.nome, data.cpf),
    );
    return {
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
    };
  }
}
