
export class PagamentoProcessadoEvent {
  constructor(public pagamento: PagamentoProcessadoDto) { }
}

export interface PagamentoProcessadoDto{
    id_pagamento: string;
    id_pedido: string;
    status: string;
}

