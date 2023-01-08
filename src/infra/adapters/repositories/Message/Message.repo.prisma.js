import { PrismaClient } from '@prisma/client';
import RStudent from '/infra/adapters/repositories/Friend';
import writeMedia from './Message.helpers';

class RMessage {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async store(messageObj) {
    const rstudent = new RStudent();
    const { address } = await rstudent.getByAddress(messageObj.friendAddress);

    if (messageObj.mediaBlob) {
      await writeMedia(messageObj, sender.name);
    }

    const newMessage = await this.prisma.message.create({
      data: {
        message: messageObj.message,
        senderIsMailler: messageObj.senderIsMailler,
        sender: { connect: { address } },
      },
    });

    return newMessage;
  }
}

export default RMessage;
