import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from '../../identificacao/infrastructure/controller/clientes.controller';
import { CreateClienteUseCase } from '../../identificacao/core/application/usecases/cliente/create.cliente.usecase';
import { IndentifyClienteUseCase } from '../../identificacao/core/application/usecases/cliente/identify.cliente.usecase';
import { FindClienteUseCase } from '../../identificacao/core/application/usecases/cliente/find.cliente.usecase';
import { DeleteClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/delete.cliente.usecase';

describe('ClientesController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        CreateClienteUseCase,
        IndentifyClienteUseCase,
        FindClienteUseCase,
        DeleteClienteUseCase,
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
