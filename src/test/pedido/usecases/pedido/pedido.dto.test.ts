import {
  InputPedidoDTO,
  OutputPedidoDTO,
  PedidoDTO,
} from '../../../../pedido/core/application/usecases/pedidoUseCase/pedido.dto';
import { CreateItemDTO } from '../../../../pedido/core/application/usecases/item.dto';

describe('PedidoDTO', () => {
  it('should create a PedidoDTO instance', () => {
    const pedidoDTO = new PedidoDTO();
    expect(pedidoDTO).toBeInstanceOf(PedidoDTO);
  });
});

describe('InputPedidoDTO', () => {
  it('should create an InputPedidoDTO instance', () => {
    const inputPedidoDTO = new InputPedidoDTO();
    expect(inputPedidoDTO).toBeInstanceOf(InputPedidoDTO);
  });
});

describe('OutputPedidoDTO', () => {
  it('should create an OutputPedidoDTO instance', () => {
    const outputPedidoDTO = new OutputPedidoDTO();
    expect(outputPedidoDTO).toBeInstanceOf(OutputPedidoDTO);
  });
});

describe('CreateItemDTO', () => {
  it('should create a CreateItemDTO instance', () => {
    const createItemDTO = new CreateItemDTO();
    expect(createItemDTO).toBeInstanceOf(CreateItemDTO);
  });
});
