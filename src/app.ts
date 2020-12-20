import express from 'express';
import cors from 'cors';
import router from './routes';
import logger from './services/logger';

const app = express();
const port = process.env.PORT || 21032;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log("Api running on port " + port);
  logger.info("Api running on port " + port);
});