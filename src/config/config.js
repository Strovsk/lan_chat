import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class Config {
  static __filename = fileURLToPath(import.meta.url);
  static __dirname = path.dirname(this.__filename);
  static configFilePath = path.join(this.__dirname, 'config.json');
  
  static checkConfigFile() {
    return fs.existsSync(this.configFilePath);
  }
  
  static #createConfigFile() {
    const content = {
      installPath: this.__dirname,
    };
    fs.writeFileSync(this.configFilePath, JSON.stringify(content), { encoding: 'utf-8' });
  }
  
  static #readConfigFile() {
    if (!this.checkConfigFile()) this.#createConfigFile();
    
    return JSON.parse(fs.readFileSync(this.configFilePath));
  }
  
  static baseurl() {
    const config = this.#readConfigFile();
    return config.installPath;
  }
}

export default Config;
