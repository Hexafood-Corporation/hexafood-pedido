import { PedidosPendentesUseCase } from '../../../../pedido/core/application/usecases/pedidoUseCase/pedidos.pendentes.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { OutputPedidoDTO } from '../../../../pedido/core/application/usecases/pedidoUseCase/pedido.dto';

describe('PedidosPendentesUseCase', () => {
  let pedidosPendentesUseCase: PedidosPendentesUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(() => {
    pedidosRepository = {
      findAll: jest.fn(),
    } as unknown as IPedidosRepository;
    pedidosPendentesUseCase = new PedidosPendentesUseCase(pedidosRepository);
  });

  it('should return an array of pending orders', async () => {
    const pendingOrders: OutputPedidoDTO[] = [
      {
        id: 1,
        id_cliente: 1,
        itens: [
          {
            quantidade: 2,
            valor: 5.25,
            id_produto: 1,
          },
          {
            quantidade: 1,
            valor: 5.25,
            id_produto: 2,
          },
        ],
      },
    ];

    jest
      .spyOn(pedidosRepository, 'findAll')
      .mockResolvedValue(pendingOrders as any);

    const result = await pedidosPendentesUseCase.execute();

    expect(result).toEqual(pendingOrders);
    expect(pedidosRepository.findAll).toHaveBeenCalledWith(
      StatusPedido.RECEBIDO,
    );
  });
});
