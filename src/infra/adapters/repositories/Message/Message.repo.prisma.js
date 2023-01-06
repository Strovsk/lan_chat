import { PrismaClient } from '@prisma/client';

class RMessage {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async store(messageObj) {
    const sender = await this.prisma.friend.findFirst({
      where: { address: messageObj.friendAddress },
    });

    if (messageObj.mediaBlob) {
      await this.writeMedia(messageObj, sender.name);
    }
  

    const newMessage = await this.prisma.message.create({
      data: {
        message: this.messageObj.message,
        sender,
      }
    })

    return newMessage;
  }
}

export default RMessage;
