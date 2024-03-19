export const IQueueService = 'IQueueService';

export interface IQueueService {
    // sendMessage(ueueName: string, message: string);
    sendMessage(queueName: string, message: string, onError?: (error: Error) => Promise<void>);
    getQueueUrl(queueName: string): Promise<any>;
}
