import express from 'express';
import cors from 'cors';
import router from './routes';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || 3333;
const systemLog = logger('system');

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => systemLog.info('Api running on port ' + port));