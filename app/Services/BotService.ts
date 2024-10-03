import * as venom from 'venom-bot';
import { EventEmitter } from 'events';
import Env from '@ioc:Adonis/Core/Env';
import Logs from 'App/Models/Logs';

class BotService {
  static clientInstance: any = null;
  static eventEmitter = new EventEmitter();

  static async initializeClient() {
    if (!BotService.clientInstance) {
      try {
        BotService.clientInstance = await venom.create({
          session: Env.get('SESSION_NAME', 'default_session'),
          multidevice: Env.get('VENOM_MULTIDEVICE', 'false') === 'true',
          headless: 'new',
          useChrome: true,
          browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
          executablePath: '/usr/bin/google-chrome-stable',
        }as any);

        // Adiciona o listener de mensagens
        BotService.clientInstance.onMessage(async (message: any) => {
          BotService.eventEmitter.emit('messageReceived', message);
        });

      } catch (error) {
        console.error('Failed to initialize Venom bot:', error);
      }
    }
  }

  static getClient() {
    return BotService.clientInstance;
  }

  static async sendMessage(to: string, messages: string[]) {
    if (!BotService.clientInstance) {
      await BotService.initializeClient();
    }

    const client = BotService.getClient();
    if (client) {
      for (const message of messages) {
        try {
          await client.sendText(to, message);
        } catch (error) {
          console.error('Error sending message:', error);
          await Logs.create({
            log: error.text || error.message || 'Unknown error',
          });
        }
      }
    } else {
      const errorMsg = 'Venom client is not initialized.';
      console.error(errorMsg);
      await Logs.create({
        log: errorMsg,
      });
    }
  }

  static normalizeNumber(number: string): string {
    let normalized = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Remove o zero inicial, se houver
    if (normalized.startsWith('0')) {
      normalized = normalized.substring(1);
    }

    // Adiciona o código do país se não estiver presente
    if (!normalized.startsWith('55')) {
      normalized = `55${normalized}`;
    }

    // Verifica se o número precisa do dígito 9 na quinta posição
    if (normalized.length === 12 && normalized.startsWith('55')) {
      normalized = normalized.slice(0, 4) + '9' + normalized.slice(4);
    }

    return normalized + '@c.us';
  }

  static on(event: string, listener: (...args: any[]) => void) {
    BotService.eventEmitter.on(event, listener);
  }
}

export default BotService;
