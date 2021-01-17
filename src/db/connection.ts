import mysql from 'mysql';
import logger from '../utils/logger';
import dbConfig from '../config/database.json';

const dbLog = logger("database");
const con = mysql.createConnection(dbConfig);

con.connect(function (err) {
  if (err)
    return dbLog.error(String(err));

    dbLog.info(`Connected to database on ${dbConfig.host}, user ${dbConfig.user}.`);
});

export default con;