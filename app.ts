import express from 'express';
import router from './src/router';
import logger from './src/services/logger';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.listen(port, () => logger.info("Api running on port " + port));