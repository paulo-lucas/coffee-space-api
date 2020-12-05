import express from 'express';
import router from './src/routes';
import logger from './src/services/logger';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("Api running on port " + port);
  logger.info("Api running on port " + port);
});