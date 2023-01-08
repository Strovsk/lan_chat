import fs from 'fs';
import path from 'node:path';
import fetch from 'node-fetch';
import Config from 'config';

async function filterRequest(response) {
  const blob = Buffer.from(await response.arrayBuffer());
  const [type, ext] = response.headers.get('Content-Type').split('/');

  if (!type.startsWith('image')) {
    throw new Error('The file must be an image');
  }

  return { blob, ext };
}

function isExternalLink(link) {
  const httpLinkPattern =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return httpLinkPattern.test(link);
}

function isData64(link) {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/]*={0,2})$/;
  return base64Pattern.test(link);
}

function saveBase64(datapath, avatarLocation) {
  const fileExtPattern = /^data:image\/(\w+);base64,/;
  const fileExt = datapath.match(fileExtPattern)[1];

  const pathAvatarFile = path.join(avatarLocation, `avatar.${fileExt}`);

  const rawBase64Data = datapath.replace(/^data:image\/\w+;base64,/, '');

  fs.writeFileSync(pathAvatarFile, rawBase64Data, 'base64');
}

async function saveFromLink(link, avatarLocation) {
  const response = await fetch(link);
  const { blob, ext } = await filterRequest(response);

  const pathAvatarFile = path.join(avatarLocation, `avatar.${ext}`);

  fs.writeFileSync(pathAvatarFile, blob);
}

async function copyFromFile(filepath, avatarPath) {
  const destlocation = path.join(avatarPath, path.basename(filepath));

  fs.copyFile(datapath, destlocation, (error) => {
    if (error) throw new Error('cant select avatar');
  });
}

async function setupAvatar(datapath) {
  const avatarLocation = Config.baseurl('data');

  if (isExternalLink(datapath)) return saveFromLink(datapath, avatarLocation);

  if (isData64(datapath)) return saveBase64(datapath, avatarLocation);

  if (!fs.existsSync(datapath)) throw new Error('Invalid provided link');

  copyFromFile(datapath, avatarLocation);
}

export default setupAvatar;
