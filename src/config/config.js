import fs from 'fs';
import path from 'path';

class Config {
  static checkConfigFile() {
    return fs.existsSync(this.configFilePath);
  }

  static #createConfigFile() {
    const content = {
      installPath: __dirname,
    };
    fs.writeFileSync(this.configFilePath, JSON.stringify(content), {
      encoding: 'utf-8',
    });
  }

  static #readConfigFile() {
    if (!this.checkConfigFile()) this.#createConfigFile();

    return JSON.parse(fs.readFileSync(this.configFilePath));
  }

  static baseurl(location) {
    const config = this.#readConfigFile();
    return path.join(config.installPath, location);
  }
}

export default Config;
