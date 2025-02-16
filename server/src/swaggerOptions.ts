const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Todo App API',
        version: '1.0.0',
        description: 'API para gerenciamento de tarefas',
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Servidor de desenvolvimento',
        },
      ],
      components: {
        schemas: {
          Todo: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'uuid-1234' },
              user_email: { type: 'string', example: 'usuario@exemplo.com' },
              title: { type: 'string', example: 'Comprar leite' },
              description: { type: 'string', example: 'Comprar 2 litros de leite' },
              progress: { type: 'number', example: 50 },
              date: { type: 'string', example: '2025-02-16T12:00:00Z' },
              status: {
                type: 'string',
                enum: ['pendente', 'em progresso', 'concluída'],
                example: 'pendente',
              },
            },
          },
        },
      },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
  };
  
  export default swaggerOptions;
  