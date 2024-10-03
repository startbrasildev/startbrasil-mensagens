// app/Controllers/Http/AsoController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MessagesQueueService from 'App/Services/MessagesQueueService';


export default class TestController {
    async test({ request, response }: HttpContextContract) {
        try {
            const info = request.body();
            const test: any = info.test;

            // Criando as mensagens
            const messages = [
                `Olá, ${test.nome}! \n\nVocê está recebendo esta mensagem da Sofia!`,
            ];

            // Enviando as mensagens
            await MessagesQueueService.addMessage(`554199312908@c.us`, messages);

            response.send({ success: true, message: test.nome });

        } catch (error) {
            console.error('Error when sending:', error);
            response.status(500).send({ success: false, message: 'Failed to send message.' });
        }
    }
}
