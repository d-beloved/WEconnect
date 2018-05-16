import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import router from './server/routes/router';

// load all env variables from .env file into process.env object.
dotenv.config();
// Set up the Swagger document for API documentation
const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger('dev'));

// for serving the Swagger documentation
app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set router for api endpoints
app.use('/', router);

// set the port for the app
const port = process.env.PORT || 3001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`WEconnect App Listening on port ${port}!`);
});

// This will be our application entry. Our app is setup here.

export default app;
