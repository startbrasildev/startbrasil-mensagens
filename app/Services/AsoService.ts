import 'dotenv/config';
import MessagesQueueService from './MessagesQueueService';
import BotService from './BotService';

class AsoService {

  async sendMessage(messageInfo) {
    const phoneNumber = messageInfo.funcionario.telefone;
  
    function getExameDescricao(tp_exa) {
      const tiposDeExame = {
        'adm': 'Admissional',
        'dem': 'Demissional',
        'apos_adm, 3': 'Após admissional - 3 meses',
        'apos_adm, 6': 'Após admissional - 6 meses',
        'ret_tra': 'Retorno ao Trabalho',
        'mud_fun': 'Mudança de Função',
        'periodicidade, 3': 'Periódico - 3 meses',
        'periodicidade, 6': 'Periódico - 6 meses',
        'periodicidade, 12': 'Periódico - Anual',
        'periodicidade, 24': 'Periódico - Bienal',
        'periodicidade, 36': 'Periódico - Trienal',
        'periodicidade, 48': 'Periódico - Quadrienal',
        'periodicidade, 60': 'Periódico - Quinquenal'
      };
  
      return tiposDeExame[tp_exa] || 'Tipo de Exame Desconhecido';
    }
  
    const nomeFuncionario = messageInfo.funcionario.nome;
    const funcao = messageInfo.funcionario.funcao;
    const cpf = messageInfo.funcionario.cpf;
    const nomeEmpresa = messageInfo.empresa.nome;
    const { nome_medico, crm, id_con, tp_exam, link_aso } = messageInfo.aso;
  
    const descricaoExame = getExameDescricao(tp_exam);
  
    const formattedNumber = `${phoneNumber}@c.us`;
  
    const messages = [
      `Olá, ${nomeFuncionario}! \n\nVocê está recebendo esta mensagem da Atento Medicina do Trabalho referente ao seu ASO`,
      `Informações do ASO:\n- Empresa solicitante: ${nomeEmpresa}\n- Identificação do ASO: ${id_con}\n- Função: ${funcao}\n- Tipo de Exame: ${descricaoExame}\n- CPF: ${cpf}\n- Médico Responsável: ${nome_medico} - CRM ${crm}\nPara concluir este processo, por favor, acesse:`,
      `${link_aso}`
    ];
  
    await MessagesQueueService.addMessage(formattedNumber, messages);
  }
  

  async sendTokenViaWhatsApp(info: any) {
    console.log("🚀 ~ AsoService ~ sendTokenViaWhatsApp ~ info:", info)
    const { telefoneInformado, token } = info;
    console.log("🚀 ~ AsoService ~ sendTokenViaWhatsApp ~ telefoneInformado:", telefoneInformado)
    const mensagem = [`Seu token de confirmação de telefone: ${token}`];
    await BotService.sendMessage(BotService.normalizeNumber(telefoneInformado), mensagem);
  }
}

export default new AsoService();