import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import router from './routes/router';

// Set up the Swagger document for API documentation
const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);

// Set up the express app
const server = express();

// Parse incoming requests data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
server.use(logger('dev'));

// set router for api endpoints
server.use('/api/v1', router);

// for serving the Swagger documentation
server.use(cors({ credentials: true, origin: true }));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set the port for the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`WEconnect App Listening on port ${port}!`);
});

// This will be our application entry. Our server is setup here.

export default server;
