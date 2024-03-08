/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   
    language: 'en-US',      
    disableLogs: false,     
    autoHeaders: false,
    autoQuery: false,       
    autoBody: false         
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Authentication REST API',        
    description: 'Authentication API microservice documentation',  
    contact: {
        'name': 'API Support',
        'email': '922tech@gmail.com'
    },
  },
  host: 'localhost:3000/',
  basePath: '/',  
  schemes: ['http'],
  consumes: ['application/json'],  
  produces: ['application/json'],  
  tags: [
    {
        name: 'Auth',
        description: 'Authentication API microservice documentation'
    }
  ],
  securityDefinitions: {}, 
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./src/app.ts', './controllers/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);