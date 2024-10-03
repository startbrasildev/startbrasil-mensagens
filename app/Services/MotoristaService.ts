import MessagesQueueService from 'App/Services/MessagesQueueService';

class MotoristaService {
    public async sendApprovedMessage(nomeMotorista: string, nomeEmpresa: string, numeroMotorista: string) {
        try {
            // Criando a mensagem personalizada
            const messages = [
                `Olá, ${nomeMotorista}!\n\nSua candidatura para a empresa ${nomeEmpresa} foi aprovada! Boa sorte na viagem!`
            ];

            // Enviando a mensagem para o número do motorista
            await MessagesQueueService.addMessage(`${numeroMotorista}@c.us`, messages);

            return { success: true, message: `Mensagem enviada para ${nomeMotorista}` };

        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            return { success: false, message: 'Falha ao enviar a mensagem.' };
        }
    }
}

export default new MotoristaService();
