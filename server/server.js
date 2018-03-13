import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/router';

// Set up the express app
const server = express();

// Parse incoming requests data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
server.use(logger('dev'));

// set router for api endpoints
// router(app);
server.use('/api/v1', router);

// Set up all default catch-all route that sends a message in JSON format
server.get('*', (req, res) => res.status(404).send({
  message: 'That route does not exist'
}));

server.listen('3001', () => {
  /* eslint-disable no-console */
  console.log('WEconnect App is listening on port 3001');
});

// This will be our application entry. Our server is setup here.

export default server;
