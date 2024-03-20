import { Cliente } from 'src/identificacao/core/domain/cliente/entity/cliente.entity';
import {INotificacaoService} from './../interfaces/notificacao.service';

export class NotificacaoService implements INotificacaoService {

    async notificarPorEmail(cliente: Cliente) {
        if (cliente.email) {
            console.log(`Enviando notificação de cancelamento para ${cliente.nome} via e-mail.`);
        } else {
            console.log(`Não é possível enviar notificação para ${cliente.nome} via e-mail.`);
        }
    }
}