import RFriend from 'infra/adapters/repositories/Friend';
import { Friend } from 'core/entities';

function main() {
  const createFriend = async () => {
    const friend = new Friend('John', '127.0.0.1');
    const friendRepo = new RFriend();
    // const result = await friendRepo.create(friend);
    // const result = await friendRepo.getAll();
    const result = await friendRepo.getByName('John');
    console.log(result);
  };
  createFriend();
}

main();
