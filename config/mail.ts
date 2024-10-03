// Dentro de config/mail.ts

const mailConfig = {
    mailer: 'smtp',
    smtp: {
      driver: 'smtp',
      pool: true,
      port: 2525,
      host: 'smtp.mailtrap.io',
      secure: false,
      auth: {
        user: 'seu_usuario',
        pass: 'sua_senha',
      },
    },
  }
  
  export default mailConfig;
  