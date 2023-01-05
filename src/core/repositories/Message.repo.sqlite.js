import { PrismaClient } from '@prisma/client';
import path from 'node:path';
import fs from 'fs';
import Config from '../../config/config';

class RMessage {
  constructor(message, senderName) {
    this.messageObj = message;
    this.senderName = senderName;
  }

  async writeMedia() {
    if (!this.messageObj.mediaBlob) return;
    const mediaPath = path.join(
      Config.baseurl(`friends/${this.senderName}`),
      this.messageObj.message.replace('media:///', ''),
    );

    if (!fs.existsSync(mediaPath)) {
      fs.mkdirSync(mediaPath, { recursive: true });
    }

    fs.writeFileSync(mediaPath, this.messageObj.mediaBlob);
    return;
  }

  async storeMessage() {
    await this.writeMedia()
  
    const prisma = new PrismaClient();
    const sender = await prisma.friend.findFirst(
      { where: { name: this.senderName } }
    );

    const newMessage = await prisma.message.create({
      data: {
        message: this.messageObj.message,
        sender,
      }
    })

    prisma.$disconnect();
  }
}

export default RMessage;
