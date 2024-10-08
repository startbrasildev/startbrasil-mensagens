export default {
    uiEnabled: true, // Ativar a UI do Swagger
    specEnabled: true, // Ativar o arquivo JSON da especificação
    middleware: [],
  
    options: {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'Documentação da API utilizando Swagger no AdonisJS 5',
        },
      },
      apis: ['app/**/*.ts', 'start/routes.ts'],
    },
  
    uiUrl: '/docs',
    specUrl: '/swagger.json',
  };
  