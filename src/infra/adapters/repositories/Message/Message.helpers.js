import Config from 'config';
import fs from 'fs';

async function writeMedia(messageObj, senderName) {
  const mediaPath = path.join(
    Config.baseurl(`friends/${senderName}`),
    messageObj.message.replace('media:///', ''),
  );

  if (!fs.existsSync(mediaPath)) {
    fs.mkdirSync(mediaPath, { recursive: true });
  }

  fs.writeFileSync(mediaPath, messageObj.mediaBlob);
}

export default writeMedia;
