---
tags: entity, phase1, message
---

All messages are sended by or to a *remote friend*. The message object refers to this friend identified by address.
So the way to define if the *remote friend* is the sender or you is create a variable.

# Attributes
- senderAddress: **string**
- hour: **timestamp**
- message: **string**
- mediaAddressUr: **string**
	- The name of media that will be searched in the config path where media are stored in the app
    - Format: **///media:mediaName.extension**
- mediaBlob: **binary**
- senderIsMailler: **bool**
    - if remote friend is sender, it'll be set to True
