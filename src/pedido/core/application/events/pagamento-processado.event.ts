
export class PagamentoProcessadoEvent {
  constructor(public pagamento: PagamentoProcessadoDto) { }
}

export interface PagamentoProcessadoDto{
    id_pagamento: number;
    id_pedido: number;
    status: string;
}

