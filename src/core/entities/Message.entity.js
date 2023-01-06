class Message {
  constructor(senderAddress, hour, message, fromSender, mediaAddressUrl = '', mediaBlob = '') {
    this.senderAddress = senderAddress;
    this.hour = hour;
    this.message = message;
    this.mediaAddressUrl = mediaAddressUrl;
    this.mediaBlob = mediaBlob;
    this.fromSender = fromSender;
  }
}

export default Message;
