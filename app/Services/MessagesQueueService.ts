import MessagesQueue from 'App/Models/MessagesQueue';
import { DateTime } from 'luxon';
import BotService from './BotService';

class MessageQueueService {
  private messageCache: any[] = [];

  constructor() {
    this.startQueueProcessor();
  }

  async addMessage(phone: string, messages: string[]) {
    const lastMessage: any = await MessagesQueue.query().orderBy('run_on', 'desc').first();

    let runOnTime = DateTime.now();
    let fiveMinutesAfterLastRunOn;

    if (lastMessage) {
      const lastRunOn: any = lastMessage.runOn;
      fiveMinutesAfterLastRunOn = lastRunOn.plus({ minutes: 1 });

      if (DateTime.now() <= fiveMinutesAfterLastRunOn) {
        runOnTime = fiveMinutesAfterLastRunOn;
      }
    }

    const newMessage: any = await MessagesQueue.create({
      name: 'Automated Message',
      content: messages,
      phone: phone,
      runOn: runOnTime,
      isSent: false,
    });

    if (DateTime.now() >= runOnTime) {
      await this.sendMessage(newMessage);
    } else {
      await this.refreshCache();

    }
  }

  async refreshCache() {
    const messages = await MessagesQueue.query()
      .where('is_sent', false)
      // .andWhere('run_on', '>=', DateTime.now().toJSDate())
      .andWhereNull('deleted_at')
      .orderBy('run_on', 'asc');

    // Mapear as mensagens para incluir apenas as propriedades necessárias
    this.messageCache = messages.map((message: any) => ({
      id: message.id,
      name: message.name,
      content: message.content,
      runOn: message.runOn,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      deletedAt: message.deletedAt,
      phone: message.phone,
      isSent: message.isSent,
    }));
  }

  async sendMessage(message: any) {

    if (message) {
      const msg: any = await MessagesQueue.query()
        .where('id', message.id)
        .first();

      // Enviar as mensagens usando BotService
      await BotService.sendMessage(msg.phone, msg.content);

      msg.isSent = true;
      await msg.save();
      await this.refreshCache();
    }
  }

  async processQueue() {
    await this.refreshCache();

    while (this.messageCache.length > 0) {
      const messageToProcess = this.messageCache.shift();
      if (messageToProcess && DateTime.now() >= messageToProcess.runOn) {
        await this.sendMessage(messageToProcess);
      } else {
        this.messageCache.unshift(messageToProcess);
        break;
      }
    }
  }

  startQueueProcessor() {
    setInterval(() => {
      this.processQueue().catch((error) => {
        console.error('Error processing message queue:', error);
      });
    }, 60000); // 60000 ms = 1 minuto
  }
}

export default new MessageQueueService();