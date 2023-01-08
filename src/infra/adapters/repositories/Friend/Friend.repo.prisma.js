const { PrismaClient } = require('@prisma/client');
import { Friend } from '/core/entities';

class RFriend {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(friendObj) {
    try {
      const newFriend = await this.prisma.friend.create({
        data: { name: friendObj.name, address: friendObj.address },
      });

      return newFriend;
    } catch (err) {
      return null;
    }
  }

  async delete() {
    const result = await this.prisma.friend.delete({
      where: { name: this.name },
    });
    return result;
  }

  async getAll() {
    const allFriendsList = await this.prisma.friend.findMany();
    return allFriendsList;
  }

  async getByName(name) {
    const result = await this.prisma.friend.findFirstOrThrow({
      where: { name },
    });
    const friend = new Friend(result.name, result.address);
    return friend;
  }

  async getByAddress(address) {
    const result = await this.prisma.friend.findFirstOrThrow({
      where: { address },
    });
    const friend = new Friend(result.name, result.address);
    return friend;
  }
}

export default RFriend;
