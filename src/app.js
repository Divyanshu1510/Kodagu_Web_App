// app.js
import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import taskRoutes from './routes/tasks';
import analyticsRoutes from './routes/analytics';
import errorHandler from './middleware/errorHandler';

const app = express();

require('dotenv').config();

connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use(json());

app.use('/tasks', taskRoutes);
app.use('/analytics', analyticsRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server; 
