const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campus Connect API',
      version: '1.0.0',
      description: 'API documentation for Campus Connect backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
  },
  apis: [
    './routes/*.js'
  ]
};


const swaggerSpec = swaggerJsDoc(swaggerOptions);
console.log('Loaded API routes:', 
  Object.keys(swaggerSpec.paths || {}).join('\n')
);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('✅ Swagger Docs available at: http://localhost:5000/api-docs');
};

module.exports = { setupSwagger, swaggerSpec };