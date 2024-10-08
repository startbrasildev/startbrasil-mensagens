import MessagesQueueService from 'App/Services/MessagesQueueService';

class DriverService {
  // Método para enviar mensagem personalizada via WhatsApp
  public async sendQueue(number: string, message: string) {
    try {
      await MessagesQueueService.addMessage(`${number}@c.us`, [message]);

      return { success: true, message: `Mensagem enviada com sucesso para o número ${number}.` };

    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      return { success: false, message: 'Falha ao enviar a mensagem.' };
    }
  }
}

export default new DriverService();
