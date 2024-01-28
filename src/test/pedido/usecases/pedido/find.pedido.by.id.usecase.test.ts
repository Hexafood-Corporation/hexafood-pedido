import { FindPedidoByIdUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { PedidoException } from '../../../../pedido/core/application/exceptions/pedido.exception';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';

describe('FindPedidoByIdUseCase', () => {
  let findPedidoByIdUseCase: FindPedidoByIdUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(() => {
    pedidosRepository = {
      findById: jest.fn(),
    } as unknown as IPedidosRepository;

    findPedidoByIdUseCase = new FindPedidoByIdUseCase(pedidosRepository);
  });

  describe('findById', () => {
    it('should return the pedido with the given id', async () => {
      const pedidoId = 1;
      const pedido = {
        id: pedidoId,
        id_cliente: 1,
        status: 'EM_PREPARACAO',
        valor_total: 10.5,
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
      };

      jest
        .spyOn(findPedidoByIdUseCase, 'findById')
        .mockResolvedValueOnce(pedido as Pedido);

      const result = await findPedidoByIdUseCase.findById(pedidoId);

      expect(result).toEqual(pedido);
    });

    it('should throw PedidoException if pedido is not found', async () => {
      const pedidoId = 1;

      jest
        .spyOn(findPedidoByIdUseCase, 'findById')
        .mockRejectedValue(new PedidoException('Pedido não encontrado.'));

      await expect(findPedidoByIdUseCase.findById(pedidoId)).rejects.toThrow(
        new PedidoException('Pedido não encontrado.'),
      );
    });
  });
});
