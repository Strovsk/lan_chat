---
tags: usecase, phase1, message
---

# 001 - Send an message
## Actor: [[Friend]]
## Preconditions:
- The user is in conversation with an person
## Flow of events:
1. The user write the message on a input
2. The user release *Enter* key or click in *Send Button*
3. The app create a [[Message]] Object passing the message and the *userId* with `-1` value.
## Postconditions:
- The message is stored in the message repository.
- The message is sent to the other user in the conversation.
- The message is displayed in the chat interface for the user.
- The message is marked as read for the user.