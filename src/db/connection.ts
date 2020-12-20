import mysql from 'mysql';
import logger from '../services/logger';
import dbConfig from '../config/database.json';

const con = mysql.createConnection(dbConfig);

con.connect(function (err) {
  if (err)
    return logger.error(String(err));

  logger.info(`Connected to database on ${dbConfig.host}, user ${dbConfig.user}.`);
});

export default con;