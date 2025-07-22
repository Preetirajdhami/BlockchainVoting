// swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blockchain Voting System API',
      version: '1.0.0',
      description: 'API documentation for the blockchain voting system built using Express.js and JWT authentication.',
    },
    servers: [
      {
        url: 'https://blockchainvoting-z1xf.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Path to the API route files
  apis: ['./routes/*.js'], // adjust if routes are in subfolder like ./src/routes/*.js
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
