import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SendMsgService from 'App/Services/SendMsgService';

export default class SendMsgController {
  /**
   * @swagger
   * /mensagem/enviar:
   *   post:
   *     tags:
   *       - Mensagem
   *     summary: Envio de mensagens
   *     description: Este endpoint envia uma mensagem para o número informado, podendo ser usado em diferentes contextos.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               number:
   *                 type: string
   *                 example: "5521987654321"
   *               message:
   *                 type: string
   *                 example: "Sua mensagem personalizada aqui."
   *     responses:
   *       200:
   *         description: Mensagem enviada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       400:
   *         description: Dados incompletos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Dados incompletos."
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Erro interno do servidor."
   */
  async sendQueue({ request, response }: HttpContextContract) {
    try {
      // Coletando as informações do request body
      const { number, message } = request.body();

      // Verificando se os dados obrigatórios estão presentes
      if (!number || !message) {
        return response.status(400).send({ success: false, message: 'Dados incompletos.' });
      }

      // Usar o serviço para enviar a mensagem para o número
      const result = await SendMsgService.sendQueue(number, message);

      // Verificando o sucesso do envio da mensagem
      if (result.success) {
        return response.send({ success: true, message: result.message });
      } else {
        return response.status(500).send({ success: false, message: result.message });
      }

    } catch (error) {
      // Tratamento de erro genérico
      console.error('Erro ao processar a requisição:', error);
      return response.status(500).send({ success: false, message: 'Erro interno do servidor.' });
    }
  }


  async sendNow({ request, response }: HttpContextContract) {
    try {
      // Coletando as informações do request body
      const { number, message } = request.body();

      // Verificando se os dados obrigatórios estão presentes
      if (!number || !message) {
        return response.status(400).send({ success: false, message: 'Dados incompletos.' });
      }

      // Usar o serviço para enviar a mensagem para o número
      const result = await SendMsgService.sendNow(number, message);

      // Verificando o sucesso do envio da mensagem
      if (result.success) {
        return response.send({ success: true, message: result.message });
      } else {
        return response.status(500).send({ success: false, message: result.message });
      }

    } catch (error) {
      // Tratamento de erro genérico
      console.error('Erro ao processar a requisição:', error);
      return response.status(500).send({ success: false, message: 'Erro interno do servidor.' });
    }
  }
}
