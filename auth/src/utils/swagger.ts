const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Auth API',
        version: '1.0.0',
        description: 'This is the documentation for authentication microservice API',
    },
};

const options = {
    swaggerDefinition,
    apis: ['../routes/*.ts'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;