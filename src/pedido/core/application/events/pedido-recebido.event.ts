import { Pedido } from "../../domain/entity/pedido.entity";

export class PedidoRecebidoEvent {
    constructor(public pedido: Pedido) {}
}
  