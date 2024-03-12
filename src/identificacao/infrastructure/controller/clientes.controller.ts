import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/create.cliente.usecase';
import { IndentifyClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/identify.cliente.usecase';
import { InputClienteDto } from '../../core/application/usecases/cliente/cliente.dto';
import { DeleteClienteUseCase } from 'src/identificacao/core/application/usecases/cliente/delete.cliente.usecase';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly identiyClienteUseCase: IndentifyClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase
  ) {}

  @Post()
  create(@Body() cliente: InputClienteDto) {
    return this.createClienteUseCase.execute(cliente);
  }

  @Get(':cpf')
  async findByCPF(@Param('cpf') cpf: string): Promise<InputClienteDto | null> {
    return await this.identiyClienteUseCase.execute(cpf);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.deleteClienteUseCase.execute(id);
  }
}
