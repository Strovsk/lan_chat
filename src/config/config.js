import fs from 'fs';
import path from 'path';

class Config {
  static configFilePath = path.join(__dirname, 'config.json');

  static checkConfigFile() {
    return fs.existsSync(this.configFilePath);
  }

  static #createConfigFile() {
    const content = {
      installPath: path.resolve(__dirname, '..'),
      logPath: path.resolve(__dirname, '..', 'logs'),
    };
    fs.writeFileSync(this.configFilePath, JSON.stringify(content), {
      encoding: 'utf-8',
    });
  }

  static #readConfigFile() {
    if (!this.checkConfigFile()) this.#createConfigFile();
    return JSON.parse(fs.readFileSync(this.configFilePath));
  }

  static baseurl(location, keyConfigPath = '') {
    const config = this.#readConfigFile();
    if (!!keyConfigPath) return path.join(config[keyConfigPath], location);
    return path.join(config.installPath, location);
  }

  static getConfigData(key) {
    const config = this.#readConfigFile();
    return config[key];
  }
}

export default Config;
