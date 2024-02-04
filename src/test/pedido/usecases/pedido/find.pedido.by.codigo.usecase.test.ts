import { FindPedidoByCodigoUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.codigo.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { PedidoException } from 'src/pedido/core/application/exceptions/pedido.exception';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';

describe('FindPedidoByCodigoUseCase', () => {
  let findPedidoByCodigoUseCase: FindPedidoByCodigoUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(() => {
    pedidosRepository = {
      findByCodigo: jest.fn(),
    } as unknown as IPedidosRepository;

    findPedidoByCodigoUseCase = new FindPedidoByCodigoUseCase(
      pedidosRepository,
    );
  });

  describe('execute', () => {
    it('should return the pedido with the given codigo_pedido', async () => {
      const codigo_pedido = 'ABC123';
      const pedido = {
        id: 1,
        codigo_pedido: 'ABC123',
      };

      jest
        .spyOn(pedidosRepository, 'findByCodigo')
        .mockResolvedValue(pedido as Pedido);

      const result = await findPedidoByCodigoUseCase.execute(codigo_pedido);

      expect(pedidosRepository.findByCodigo).toHaveBeenCalledWith(
        codigo_pedido,
      );
      expect(result).toEqual(pedido);
    });

    it('should throw PedidoException if no pedido is found with the given codigo_pedido', async () => {
      const codigo_pedido = 'XYZ789';

      jest.spyOn(pedidosRepository, 'findByCodigo').mockResolvedValue(null);

      await expect(
        findPedidoByCodigoUseCase.execute(codigo_pedido),
      ).rejects.toThrow(
        new PedidoException('Código de pedido não encontrado.'),
      );
    });
  });
});
