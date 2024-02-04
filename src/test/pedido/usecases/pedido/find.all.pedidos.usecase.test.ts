import { FindAllPedidosUseCase } from 'src/pedido/core/application/usecases/pedidoUseCase/find.all.pedidos.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { PedidoException } from 'src/pedido/core/application/exceptions/pedido.exception';

describe('FindAllPedidosUseCase', () => {
  let findAllPedidosUseCase: FindAllPedidosUseCase;
  let pedidosRepository: IPedidosRepository;

  beforeEach(() => {
    pedidosRepository = {
      findAll: jest.fn(),
    } as unknown as IPedidosRepository;

    findAllPedidosUseCase = new FindAllPedidosUseCase(pedidosRepository);
  });

  describe('execute', () => {
    it('should return all pedidos', async () => {
      const pedidos: Partial<Pedido>[] = [
        {
          id: 1,
          id_cliente: 1,
          status: StatusPedido.EM_PREPARACAO,
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
        },
        {
          id: 2,
          id_cliente: 2,
          status: StatusPedido.PRONTO,
          valor_total: 15.75,
          itens: [
            {
              quantidade: 3,
              valor: 5.25,
              id_produto: 3,
            },
          ],
        },
      ];

      jest
        .spyOn(pedidosRepository, 'findAll')
        .mockResolvedValue(pedidos as Pedido[]);

      const result = await findAllPedidosUseCase.execute();

      expect(pedidosRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 1,
          id_cliente: 1,
          status: StatusPedido.EM_PREPARACAO,
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
        },
        {
          id: 2,
          id_cliente: 2,
          status: StatusPedido.PRONTO,
          valor_total: 15.75,
          itens: [
            {
              quantidade: 3,
              valor: 5.25,
              id_produto: 3,
            },
          ],
        },
      ]);
    });

    it('should throw PedidoException if no pedidos are found', async () => {
      jest.spyOn(pedidosRepository, 'findAll').mockResolvedValue([]);

      await expect(findAllPedidosUseCase.execute()).rejects.toThrow(
        new PedidoException('Não há nenhum pedido realizado.'),
      );
    });
  });
});
