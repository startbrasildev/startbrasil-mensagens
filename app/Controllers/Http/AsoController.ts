// app/Controllers/Http/AsoController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AsoService from 'App/Services/AsoService';

export default class AsoController {
  async send({ request, response }: HttpContextContract) {
    try {
      const info = request.body();
      const result = await AsoService.sendMessage(info);
      response.send({ success: true, message: 'Message sent successfully.', result });
    } catch (error) {
      console.error('Error when sending:', error);
      response.status(500).send({ success: false, message: 'Failed to send message.' });
    }
  }
}
