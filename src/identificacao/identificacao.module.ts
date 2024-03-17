import { Module } from '@nestjs/common';
import { ClientesController } from './infrastructure/controller/clientes.controller';
import { ClientesRepository } from './infrastructure/gateway/clientes.repository';
import { IClientesRepository } from 'src/identificacao/core/domain/cliente/repository/clientes.repository';
import { APP_FILTER } from '@nestjs/core';
import { FindClienteUseCase } from './core/application/usecases/cliente/find.cliente.usecase';
import { CreateClienteUseCase } from './core/application/usecases/cliente/create.cliente.usecase';
import { IndentifyClienteUseCase } from './core/application/usecases/cliente/identify.cliente.usecase';
import { DeleteClienteUseCase } from './core/application/usecases/cliente/delete.cliente.usecase';
import { ValidationFilter } from './infrastructure/filter/validation.filter';

@Module({
  controllers: [ClientesController],
  providers: [
    {
      provide: IClientesRepository,
      useClass: ClientesRepository,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    FindClienteUseCase,
    CreateClienteUseCase,
    IndentifyClienteUseCase,
    DeleteClienteUseCase,
  ],
  exports: [
    FindClienteUseCase,
    IClientesRepository,
    IndentifyClienteUseCase,
    CreateClienteUseCase,
    DeleteClienteUseCase,
  ],
})
export class IdentificacaoModule {}
