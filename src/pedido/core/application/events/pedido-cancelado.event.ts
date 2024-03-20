import { Pedido } from "../../domain/entity/pedido.entity";

export class PedidoCanceladoEvent {
    constructor(public pedido: Pedido) {  
    }  
}