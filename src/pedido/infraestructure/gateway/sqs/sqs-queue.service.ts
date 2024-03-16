import { SQSClient, GetQueueUrlCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
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

    async sendMessage(queueName: string, message: string) {

        //Obtem a url da fila
        const queueUrl = await this.getQueueUrl(queueName);
        console.log(message);

        const params = {
            MessageBody: message,
            QueueUrl: queueUrl.QueueUrl
        };

        //Envia a mensagem para a fila
        try {
            const comand = new SendMessageCommand(params);
            const data = await this.sqs.send(comand);
            console.log("Success", data.MessageId);
        } catch (error) {
            console.log("Error", error);
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
}