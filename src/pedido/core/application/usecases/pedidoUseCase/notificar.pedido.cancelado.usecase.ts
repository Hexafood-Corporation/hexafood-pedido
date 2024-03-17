import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { INotificacaoService } from 'src/pedido/core/domain/interfaces/notificacao.service';
import { FindClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NotificarPedidoCanceladoUseCase {
  constructor(
    @Inject(INotificacaoService)
    private notificacaoService: INotificacaoService,
    private findClienteUseCase: FindClienteUseCase
  ) {}

  async execute(pedido: Pedido): Promise<void> {

    const cliente = await this.findClienteUseCase.execute(pedido.cliente.id);
    await this.notificacaoService.notificarPorEmail(cliente);
  }
}
