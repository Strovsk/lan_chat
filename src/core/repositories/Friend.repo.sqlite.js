import { PrismaClient } from "@prisma/client";

class RFriend {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(friendObj) {
    try {
      const newFriend = await this.prisma.friend.create({
        data: { name: friendObj.name, address: friendObj.address },
      });

      this.prisma.$disconnect();
      
      return newFriend;
    } catch (err) {
      console.error(err);
      this.prisma.$disconnect();
      return null;
    }
  }

  async delete() {
    const result = await this.prisma.friend.delete({ where: { name: this.name } })
    return result;
  }

  async getAll() {
    await this.prisma.$connect();
    const allFriendsList = await this.prisma.friend.findMany();
    return allFriendsList;
  }
}

export default RFriend;
