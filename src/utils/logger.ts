import log4js from 'log4js';
import mkdirp from 'mkdirp';
import path from 'path';

mkdirp.sync(path.join(__dirname, '..', 'logs'));

log4js.configure({
  appenders: {
    default: {
      type: "dateFile",
      filename: path.join(__dirname, '..', 'logs', 'history'),
      category: ["default", "database", "router", "controller", "system"],
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true
    },
    console: { type: 'console' },
  },
  categories: {
    "default": {
      appenders: ["default", "console"],
      level: "info"
    },
    "database": {
      appenders: ["default", "console"],
      level: "info"
    },
    "router": {
      appenders: ["default", "console"],
      level: "info"
    },
    "controller": {
      appenders: ["default", "console"],
      level: "info"
    },
    "system": {
      appenders: ["default", "console"],
      level: "info"
    },
  }
});

export default log4js.getLogger;
