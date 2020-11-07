import log4js from 'log4js';
import mkdirp from 'mkdirp';
import path from 'path';

mkdirp.sync(path.join(process.cwd(), 'logs'));

log4js.configure({
  appenders: {
    default: {
      type: "dateFile",
      filename: path.join(process.cwd(), 'logs', 'log'),
      category: "default",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true
    }
  },
  categories: {
    "default": {
      appenders: ["default"],
      level: "info"
    }
  }
});

const logger = log4js.getLogger('default');

export default logger;
