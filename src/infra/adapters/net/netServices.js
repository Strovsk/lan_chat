import dgram from 'dgram';
import { Log } from '/config';
import os from 'node:os';

class NetServices {
  constructor(port = 9999, networkInterfaceName = 'Wi-Fi') {
    this.port = port;
    this.socketType = 'udp4';
    this.socketObj = dgram.createSocket(this.socketType);

    this.allNetworkInterfaces = os.networkInterfaces();

    this.interfaceName = networkInterfaceName;

    this.networkInfo = { ...this.#getNetworkInfo() };

    this.broadcastAddress = this.#calcBroadcastAddress();
  }

  #getNetworkInfo() {
    const networkInfo = this.allNetworkInterfaces[this.interfaceName].find(
      (subnet) => subnet.family === 'IPv4',
    );
    return networkInfo;
  }

  #calcBroadcastAddress() {
    const { address, netmask } = this.networkInfo;
    const addressPortions = address.split('.');

    netmask
      .replace(/0/g, '1')
      .replace(/255/g, '0')
      .split('.')
      .map((isDinamic, index) => {
        if (Number(isDinamic)) addressPortions[index] = '255';
      });

    return addressPortions.join('.');
  }

  setNetworkInterface(newInterface) {
    this.interfaceName = newInterface;
    this.networkInfo = { ...this.#getNetworkInfo() };
  }

  openServer() {
    this.socketObj.on('message', (msg, info) => {
      Log.info(`Message [${info.address}]: ${msg.toString()}`);
      this.socketObj.send(
        `Estamos conectados: ${JSON.stringify(this.socketObj.address())}`,
        info.port,
        info.address,
      );
    });

    this.socketObj.on('listening', () => {
      Log.info(`Servidor escutando: ${this.socketObj.address()}`);
    });

    this.socketObj.bind(this.port);
  }

  findServer() {
    this.socketObj.bind(() => this.socketObj.setBroadcast(true));

    this.socketObj.on('message', (msg, info) => {
      Log.info(`Message from ${info.address}: ${msg}`);
    });

    this.socketObj.send('Hello World', 9999, this.broadcastAddress, (err) => {
      if (err) return Log.error(err);
      Log.info('Mensagem enviada pela rede');
    });

    this.socketObj.on('close', () => this.socketObj.setBroadcast(false));
  }
}

export default NetServices;
