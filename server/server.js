import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes/router';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger('dev'));

// set router for api endpoints
// router(app);
app.use('/', router);


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.listen('3001', () => {
  /* eslint-disable no-console */
  console.log('WEconnect App is running on port 3001');
});

// This will be our application entry. Our server is setup here.
