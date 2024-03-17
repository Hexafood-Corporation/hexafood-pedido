import { Cliente } from "src/identificacao/core/domain/cliente/entity/cliente.entity";

export const INotificacaoService = 'INotificacaoService';

export interface INotificacaoService {
    notificarPorEmail(usuario: Cliente);
}