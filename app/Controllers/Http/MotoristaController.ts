import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MotoristaService from 'App/Services/MotoristaService';

export default class MotoristaController {
    async approveTrip({ request, response }: HttpContextContract) {
        try {
            const info = request.body();
            const nomeMotorista: string = info.nomeMotorista;
            const nomeEmpresa: string = info.nomeEmpresa;
            const numeroMotorista: string = info.numeroMotorista;
            if (!nomeMotorista || !nomeEmpresa || !numeroMotorista) {
                return response.status(400).send({ success: false, message: 'Dados incompletos.' });
            }

            // Usar o serviço para enviar a mensagem
            const result = await MotoristaService.sendApprovedMessage(nomeMotorista, nomeEmpresa, numeroMotorista);

            if (result.success) {
                response.send({ success: true, message: result.message });
            } else {
                response.status(500).send({ success: false, message: result.message });
            }

        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
            response.status(500).send({ success: false, message: 'Erro interno do servidor.' });
        }
    }
}
