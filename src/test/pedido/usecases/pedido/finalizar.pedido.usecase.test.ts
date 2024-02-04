import { Test, TestingModule } from '@nestjs/testing';
import { FinalizarPedidoUseCase } from '../../../../pedido/core/application/usecases/pedidoUseCase/finalizar.pedido.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { FindPedidoByIdUseCase } from '../../../../pedido/core/application/usecases/pedidoUseCase/find.pedido.by.id.usecase';

describe('FinalizarPedidoUseCase', () => {
  let finalizarPedidoUseCase: FinalizarPedidoUseCase;
  let pedidosRepository: IPedidosRepository;
  let findPedidoByIdUseCase: FindPedidoByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinalizarPedidoUseCase,
        {
          provide: 'IPedidosRepository',
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: FindPedidoByIdUseCase,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    finalizarPedidoUseCase = module.get<FinalizarPedidoUseCase>(
      FinalizarPedidoUseCase,
    );
    pedidosRepository = module.get<IPedidosRepository>('IPedidosRepository');
    findPedidoByIdUseCase = module.get<FindPedidoByIdUseCase>(
      FindPedidoByIdUseCase,
    );
  });

  describe('execute', () => {
    it('should update the status of the pedido to FINALIZADO', async () => {
      const pedidoId = 1;
      const pedido: Partial<Pedido> = {
        id: pedidoId,
        status: StatusPedido.INICIADO,
      };

      jest
        .spyOn(findPedidoByIdUseCase, 'findById')
        .mockResolvedValueOnce(pedido as Pedido);
      jest.spyOn(pedidosRepository, 'update').mockResolvedValueOnce(pedido);

      const result = await finalizarPedidoUseCase.execute(pedidoId);

      expect(result.status).toBe(StatusPedido.FINALIZADO);
      expect(pedidosRepository.update).toHaveBeenCalledWith(pedidoId, pedido);
    });
  });
});
