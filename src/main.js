import RFriend from "./core/repositories/Friend.repo.sqlite.js";

function main() {
  const createFriend = async () => {
    const friend = new RFriend('John');
    const createdFriend = await friend.delete();
    console.log(createdFriend);
    const friendsList = RFriend.getAll();
  };
  createFriend();
}

main();
