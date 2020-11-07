import mysql from 'mysql';
import logger from '../services/logger';
import dbConfig from '../config/database.json';

const con = mysql.createConnection(dbConfig);

con.connect(function (err) {
  if (err)
    return logger.error(String(err));

  logger.info(`Connected to database on localhost:3306, user 'root'.`);
});

export default con;