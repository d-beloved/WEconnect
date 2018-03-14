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
server.use('/', router);


// set the port for the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`WEconnect App Listening on port ${port}!`);
});

// This will be our application entry. Our server is setup here.

export default server;
