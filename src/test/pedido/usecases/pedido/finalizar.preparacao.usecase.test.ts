import { FinalizarPreparacaoPedidoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/finalizar.preparacao.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';

describe('FinalizarPreparacaoPedidoUseCase', () => {
  let finalizarPreparacaoPedidoUseCase: FinalizarPreparacaoPedidoUseCase;
  let pedidosRepository: IPedidosRepository;
  let findPedidoByIdUseCase: FindPedidoByIdUseCase;

  beforeEach(() => {
    pedidosRepository = {
      update: jest.fn(),
    } as unknown as IPedidosRepository;

    findPedidoByIdUseCase = {
      findById: jest.fn(),
    } as unknown as FindPedidoByIdUseCase;

    finalizarPreparacaoPedidoUseCase = new FinalizarPreparacaoPedidoUseCase(
      pedidosRepository,
      findPedidoByIdUseCase,
    );
  });

  describe('execute', () => {
    it('should update the status of the pedido to PRONTO', async () => {
      const pedidoId = 1;
      const pedido: Partial<Pedido> = {
        id: pedidoId,
        status: StatusPedido.EM_PREPARACAO,
      };

      jest
        .spyOn(findPedidoByIdUseCase, 'findById')
        .mockResolvedValue(pedido as Pedido);

      pedidosRepository.update = jest.fn().mockResolvedValue(pedido);

      const result = await finalizarPreparacaoPedidoUseCase.execute(pedidoId);

      expect(findPedidoByIdUseCase.findById).toHaveBeenCalledWith(pedidoId);
      expect(pedidosRepository.update).toHaveBeenCalledWith(pedidoId, {
        ...pedido,
        status: StatusPedido.PRONTO,
      });
      expect(result).toEqual({
        ...pedido,
        status: StatusPedido.PRONTO,
      });
    });
  });
});
