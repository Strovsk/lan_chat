class Message {
  constructor(
    senderAddress,
    message,
    senderIsMailler,
    hour = '',
    mediaAddressUrl = '',
    mediaBlob = '',
  ) {
    this.senderAddress = senderAddress;

    if (hour === '') {
      this.hour = new Date().toISOString();
    } else {
      this.hour = hour;
    }

    this.message = message;
    this.mediaAddressUrl = mediaAddressUrl;
    this.mediaBlob = mediaBlob;
    this.senderIsMailler = senderIsMailler;
  }
}

export default Message;
