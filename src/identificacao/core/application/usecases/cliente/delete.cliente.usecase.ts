import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';

export class DeleteClienteUseCase {
  constructor(private clientesRepository: IClientesRepository) {}

  async execute(id: number): Promise<void> {
    await this.clientesRepository.delete(id);
  }
}
