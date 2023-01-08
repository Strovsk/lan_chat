class Message {
  constructor(
    senderAddress,
    hour,
    message,
    senderIsMailler,
    mediaAddressUrl = '',
    mediaBlob = '',
  ) {
    this.senderAddress = senderAddress;
    this.hour = hour;
    this.message = message;
    this.mediaAddressUrl = mediaAddressUrl;
    this.mediaBlob = mediaBlob;
    this.senderIsMailler = senderIsMailler;
  }
}

export default Message;
