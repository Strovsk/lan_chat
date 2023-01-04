import fs from 'fs';
import fetch, { File } from 'node-fetch';
import path from 'path';
import { Url } from 'url';
import Config from '../../../config/config.js';
import * as FriendHelpers from './Friend.helpers.js';

class Friend {
  #defaultAvatarLocation = path.join(Config.baseurl(), 'data');

  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  
  async setupAvatar(location) {
    if (FriendHelpers.isExternalLink(location)) {
      new URL(location);
      const response = await fetch(location);
      const { blob, ext } = await FriendHelpers.filterRequest(response);

      const pathAvatarFile = path.join(
        this.#defaultAvatarLocation,
        `avatar.${ext}`,
      );

      fs.writeFileSync(pathAvatarFile, blob);
      return;
    }

    if (!fs.existsSync(location)) throw new Error('Invalid provided link');

    const destlocation = path.join(
      this.#defaultAvatarLocation,
      path.basename(location),
    );

    fs.copyFile(
      location,
      destlocation,
      (error) => {
        if (error) throw new Error('cant select avatar');
      },
    );
  }
};

const friend = new Friend('John', '127.0.0.1');
const link = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
// const link = '/home/thiago/Documents/github/lan_chat/avatar.jpeg';
friend.setupAvatar(link);
// friend.setupAvatar('http://www.google.com');

export default Friend;