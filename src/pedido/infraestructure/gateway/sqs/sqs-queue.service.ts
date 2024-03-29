import { SQSClient, GetQueueUrlCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import { NotificarPedidoCanceladoUseCase } from "src/pedido/core/application/usecases/pedidoUseCase/notificar.pedido.cancelado.usecase";
import { IQueueService } from '../../queue/queue.service';

export class SqsQueueService  implements IQueueService{
    private sqs;
    
    constructor() {
        this.sqs = new SQSClient({
            region: process.env.AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN
            },
            endpoint: process.env.AWS_SQS_ENDPOINT,
        });
    }

    async sendMessage(queueName: string, message: string, onError?: (error: Error) => Promise<void>) {

        console.log("AWS Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
        console.log("AWS Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY);
        console.log("AWS Session Token:", process.env.AWS_SESSION_TOKEN);
        console.log("AWS SQS Endpoint:", process.env.AWS_SQS_ENDPOINT);

        await this.validateCredentials(queueName);
        
        // //Obtem a url da fila
        // const queueUrl = await this.getQueueUrl(queueName);
        // console.log(message);

        // const params = {
        //     MessageBody: message,
        //     QueueUrl: queueUrl.QueueUrl
        // };

        // //Envia a mensagem para a fila
        // try {
        //     const comand = new SendMessageCommand(params);
        //     const data = await this.sqs.send(comand);
        //     console.log("Success", data.MessageId);
        // } catch (error) {
        //     console.log("Error", error);
        // }

        try {
        const queueUrl = await this.getQueueUrl(queueName);
        console.log(message);
    
        const params = {
            MessageBody: message,
            QueueUrl: queueUrl.QueueUrl,
        }        
            const command = new SendMessageCommand(params);
            const data = await this.sqs.send(command);
            console.log("Success", data.MessageId);
        } catch (error) {
            console.log("Error sendmessage ---- >", error);
            if (onError) {
                await onError(error);
            }
        }

    }

    async getQueueUrl(queueName: string): Promise<any> {
        const input = { 
            QueueName: queueName, 
            QueueOwnerAWSAccountId: process.env.AWS_ACCOUNT_ID,
        };
        const command = new GetQueueUrlCommand(input);

        try{
            return await this.sqs.send(command);
        } catch (error) {
            console.log("Error", error);
        }
    }

    async validateCredentials(queueName: string) {
        try {
            const getQueueUrlCommand = new GetQueueUrlCommand({
                QueueName: queueName, // Substitua com um nome de fila que você sabe que existe
            });
            const response = await this.sqs.send(getQueueUrlCommand);
            console.log("GetQueueUrl response:", response);
            console.log("Credenciais validadas com sucesso.");
        } catch (error) {
            console.error("Falha ao validar credenciais:", error);
        }
    }
}