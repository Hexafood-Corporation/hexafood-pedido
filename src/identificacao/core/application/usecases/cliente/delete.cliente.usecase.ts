import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';
import { ClienteException } from '../../exceptions/cliente.exception';
import { Inject } from '@nestjs/common';

export class DeleteClienteUseCase {
  constructor(
    @Inject(IClientesRepository)
    private clientesRepository: IClientesRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const client = await this.clientesRepository.findById(id);
    if (!client) {
      throw new ClienteException('Cliente não cadastrado');
    }
    await this.clientesRepository.delete(id);
  }
}
