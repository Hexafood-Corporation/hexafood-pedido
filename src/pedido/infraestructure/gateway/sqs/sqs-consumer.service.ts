import { SQSClient, ReceiveMessageCommand, GetQueueUrlCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import EventEmitter from 'events';
import { PagamentoProcessadoEvent } from 'src/pedido/core/application/events/pagamento-processado.event';

@Injectable()
export class SqsConsumerService implements OnModuleInit {
    private sqsClient: SQSClient;
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter;
    private queueNames = [
        "pagamento_processado",
    ]


    constructor() {
        this.sqsClient = new SQSClient({
            region: process.env.AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            endpoint: process.env.AWS_SQS_ENDPOINT,
        });
    }

    onModuleInit() {
        this.queueNames.forEach((queueName) => {
            console.log(queueName);
            this.consumeMessages(queueName);
        });
    }

    async getQueueUrl(queueName: string): Promise<any> {
        console.log(queueName);
        const input = {
            QueueName: queueName,
            QueueOwnerAWSAccountId: process.env.AWS_ACCOUNT_ID,
        };
        const command = new GetQueueUrlCommand(input);

        try {
            return await this.sqsClient.send(command);
        } catch (error) {
            console.log("Error", error);
        }
    }

    private async consumeMessages(queueName: string): Promise<void> {
        const { QueueUrl } = await this.getQueueUrl(queueName);
        console.log(QueueUrl);
        while (true) {
            const command = new ReceiveMessageCommand({
                QueueUrl: QueueUrl,
                MaxNumberOfMessages: 10, // Adjust as needed
                WaitTimeSeconds: 20, // Adjust as needed
            });

            try {
                const response = await this.sqsClient.send(command);
                const messages = response.Messages;

                if (messages) {
                    for (const message of messages) {
                        const pagamento = JSON.parse(message.Body);
                        this.eventEmitter.emit('pagamento.processado', new PagamentoProcessadoEvent(pagamento));
                        console.log('Received message:', message.Body);

                        // Delete the message from the queue
                        const deleteCommand = new DeleteMessageCommand({
                            QueueUrl: QueueUrl,
                            ReceiptHandle: message.ReceiptHandle,
                        });

                        try {
                            await this.sqsClient.send(deleteCommand);
                            console.log('Message deleted:', message.ReceiptHandle);
                        } catch (error) {
                            console.error('Error deleting message:', error);
                        }
                    }
                } else {
                    console.log('No messages received');
                }
            } catch (error) {
                console.error('Error receiving messages:', error);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }
    }
}

