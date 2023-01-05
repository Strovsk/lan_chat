class Message {
  constructor(sender, hour, message, mediaAddressUrl = '', mediaBlob = '') {
    this.senderInfo = sender;
    this.hour = hour;
    this.message = message;
    this.mediaAddressUrl = mediaAddressUrl;
    this.mediaBlob = mediaBlob;
  }
}

export default Message;
