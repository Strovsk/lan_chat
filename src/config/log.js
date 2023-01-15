import pino from 'pino';
import Config from './config';
import fs from 'node:fs';

class Log {
  constructor() {
    const date = new Date();
    [this.dateString] = date.toISOString().split('T', 1);

    this.logPath = Config.getConfigData('logPath');
    this.logFilePath = Config.baseurl(`${this.dateString}.log`, 'logPath');

    if (!this.#verifyLogFile()) this.createLogFile();

    if (!!Log._instance) return Log._instance;

    this._transport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: this.logFilePath, mkdir: true },
        },
        {
          target: 'pino-pretty',
        },
      ],
    });
    this._logObj = pino(this._transport);
    Log._instance = this;
  }

  #createLogFolder() {
    fs.mkdirSync(this.logPath, { recursive: true });
  }

  createLogFile() {
    if (!this.#verifyLogFolder()) this.#createLogFolder();
  }

  #verifyLogFile() {
    return fs.existsSync(this.logFilePath);
  }

  #verifyLogFolder() {
    return fs.existsSync(this.logPath);
  }

  allLogFiles() {
    const logsPath = Config.baseurl('logs');
    return fs.readdirSync(logsPath);
  }

  static async info(data) {
    const initialize = new this();
    initialize._logObj.info(data);
  }

  static async error(data) {
    const initialize = new this();
    initialize._logObj.error(data);
  }

  static async warn(data) {
    const initialize = new this();
    initialize._logObj.warn(data);
  }
}

export default Log;
