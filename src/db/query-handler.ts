import con from './connection';
import { MysqlError, FieldInfo } from 'mysql';
import logger from '../utils/logger';

const dbLog = logger("database");

interface DBResponse {
  err: MysqlError | null;
  result: Array<any>;
  field?: Array<FieldInfo>;
}

const dbquery = async (query: string): Promise<DBResponse> => {

  return await new Promise((resolve, reject) => {
    con.query(query, async (err, result, field) => {

      if (err) {
        dbLog.error(String(err));
      }

      resolve({
        err,
        result,
        field
      });
    });
  });
}

export default dbquery;