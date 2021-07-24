const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
  swaggerDefinition: {
    info: {
      title: '簡易電商網站 API',
      version: '1.0.0'
    }
  },
  apis: ['./routes/index.js']
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', require('./routes'));

app.listen(3000, () => {
  console.log('app is listening on port 3000')
});