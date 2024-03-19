import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { INotificacaoService } from 'src/pedido/core/domain/interfaces/notificacao.service';
import { FindClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';

@Injectable()
export class NotificarPedidoCanceladoUseCase {
  constructor(
    @Inject(INotificacaoService)
    private notificacaoService: INotificacaoService,
    @Inject(FindClienteUseCase)
    private findClienteUseCase: FindClienteUseCase
  ) {}

  async execute(pedido: Pedido) {

    console.log(" NotificarPedidoCanceladoUseCase ");
    const cliente = await this.findClienteUseCase.execute(pedido.cliente.id);
    await this.notificacaoService.notificarPorEmail(cliente);
  }
}
