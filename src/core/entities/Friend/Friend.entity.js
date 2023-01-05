import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import Config from '../../../config/config.js';
import * as FriendHelpers from './Friend.helpers.js';

class Friend {
  #defaultAvatarLocation = Config.baseurl('data');

  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  async setupAvatar(location) {
    if (FriendHelpers.isExternalLink(location)) {
      const response = await fetch(location);
      const { blob, ext } = await FriendHelpers.filterRequest(response);

      const pathAvatarFile = path.join(
        this.#defaultAvatarLocation,
        `avatar.${ext}`,
      );

      fs.writeFileSync(pathAvatarFile, blob);
      return;
    }

    if (FriendHelpers.isData64(location)) {
      const fileExtPattern = /^data:image\/(\w+);base64,/;
      const fileExt = location.match(fileExtPattern)[1];
      
      const pathAvatarFile = path.join(
        this.#defaultAvatarLocation,
        `avatar.${fileExt}`,
      );

      const rawBase64Data = location.replace(/^data:image\/\w+;base64,/, '');

      fs.writeFileSync(pathAvatarFile, rawBase64Data, 'base64');
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
}

// const friend = new Friend('John', '127.0.0.1');
// const link = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjL3WeleCBMLakmWxPnEbGUYA7WdFucwACEOkkPL2ZNMpookYraMFVRnLAEM2lAtsiYg&usqp=CAU';

// friend.setupAvatar(link);

export default Friend;
