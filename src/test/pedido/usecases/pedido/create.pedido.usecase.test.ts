import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter } from 'events';
import { CreatePedidoUseCase } from '../../../../pedido/core/application/usecases/pedidoUseCase/create.pedido.usecase';
import { FindClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { FindByIdsProdutosUseCase } from '../../../../pedido/core/application/usecases/produtoUseCase/find.by.ids.produtos.usecase';
import { IPedidosRepository } from 'src/pedido/core/domain/repository/pedidos.repository';
import { PedidoException } from '../../../../pedido/core/application/exceptions/pedido.exception';
import { NovoPedidoEvent } from '../../../../pedido/core/application/events/novo-pedido.event';
import { InputPedidoDTO } from '../../../../pedido/core/application/usecases/pedidoUseCase/pedido.dto';
import { Pedido } from 'src/pedido/core/domain/entity/pedido.entity';
import { faker } from '@faker-js/faker';
import { StatusPedido } from 'src/pedido/core/domain/enum/status-pedido.enum';
import { Cliente } from 'src/identificacao/core/domain/cliente/entity/cliente.entity';
import { ProdutosRepository } from '../../../../pedido/infraestructure/gateway/produtos.repository';

describe('CreatePedidoUseCase', () => {
  let createPedidoUseCase: CreatePedidoUseCase;
  let pedidosRepository: IPedidosRepository;
  let findByIdsProdutosUseCase: FindByIdsProdutosUseCase;
  let findClienteUseCase: FindClienteUseCase;
  let eventEmitter: EventEmitter;
  let produtosRepository: ProdutosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePedidoUseCase,
        {
          provide: 'IPedidosRepository',
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: FindByIdsProdutosUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindClienteUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: 'EventEmitter',
          useValue: new EventEmitter(),
        },
      ],
    }).compile();

    createPedidoUseCase = module.get<CreatePedidoUseCase>(CreatePedidoUseCase);
    pedidosRepository = module.get<IPedidosRepository>('IPedidosRepository');
    findByIdsProdutosUseCase = module.get<FindByIdsProdutosUseCase>(
      FindByIdsProdutosUseCase,
    );
    findClienteUseCase = module.get<FindClienteUseCase>(FindClienteUseCase);
    eventEmitter = module.get<EventEmitter>('EventEmitter');
  });

  describe('execute', () => {
    it('should create a new pedido and emit a novo.pedido event', async () => {
      const pedidoDto: InputPedidoDTO = {
        id: 1,
        id_cliente: 1,
        itens: [
          {
            id_produto: 1,
            quantidade: 1,
            valor: 19.95,
          },
        ],
      };

      const pedido: Partial<Pedido> = {
        id: 1,
        id_cliente: pedidoDto.id_cliente,
        itens: pedidoDto.itens.map((item) => {
          return {
            id: 1,
            id_produto: item.id_produto,
            quantidade: item.quantidade,
            valor: item.valor,
          };
        }),
        status: StatusPedido.INICIADO,
        valor_total: faker.number.int(),
        cliente: {
          id: 1,
          nome: faker.person.firstName(),
          cpf: '12345678901',
        } as Cliente,
      };

      jest.spyOn(produtosRepository, 'findById').mockResolvedValue({
        id: 1,
        nome: 'Hexa Lanche Feliz',
        id_categoria: 1,
        valor: 19.95,
        descricao: 'O clássico: pão, carne, e queijo.',
        imagem:
          'https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest
        .spyOn(pedidosRepository, 'create')
        .mockResolvedValueOnce({ id: pedido.id });
      jest
        .spyOn(findByIdsProdutosUseCase, 'execute')
        .mockResolvedValueOnce(pedidoDto.itens);

      jest
        .spyOn(findClienteUseCase, 'execute')
        .mockResolvedValueOnce(pedido.cliente);
      jest
        .spyOn(findByIdsProdutosUseCase, 'execute')
        .mockResolvedValueOnce(pedido.itens);
      const result = await createPedidoUseCase.execute(pedidoDto);

      expect(result).toEqual(pedido);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'novo.pedido',
        new NovoPedidoEvent(pedido as Pedido),
      );
    });

    it('should throw an exception if the cliente is not found', async () => {
      const pedidoDto: InputPedidoDTO = {
        id: faker.number.int(),
        id_cliente: faker.number.int(),
        itens: [
          {
            id_produto: faker.number.int(),
            quantidade: faker.number.int(),
            valor: faker.number.int(),
          },
        ],
      };

      jest
        .spyOn(pedidosRepository, 'create')
        .mockResolvedValueOnce({ id: '1' });
      jest.spyOn(findByIdsProdutosUseCase, 'execute').mockResolvedValueOnce([]);
      jest.spyOn(findClienteUseCase, 'execute').mockResolvedValueOnce(null);

      await expect(createPedidoUseCase.execute(pedidoDto)).rejects.toThrow(
        PedidoException,
      );
    });
  });
});
