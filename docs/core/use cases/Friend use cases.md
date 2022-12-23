---
tags: usecase, phase1, friend
---
# 001 - Add an friend ^fuc001
## preconditions:
- The other user must be visible waiting request connections

## Flow of events:
1. The user press *Friend* button in the interface
2. The user select *Add Friend* option in the selection menu
3. A new search window open trying to reach listen apps in lan
4. The interface show a list of available devices in the lan
5. The user find the target friend icon and click
6. A request is sended to other user (as described in [[#^002fuc|002 use case]])
7. The user waiting for request
8. A popup is raised showing the message with status of friend response
9. The search window is closed when popup is closed

## Postconditions
- If friend request is accepted:
	- The new friend must be showed in the friends list
	- The new friend relationship is stored in database as well friends informations
- if friend is rejected:
	- The friendslist is not updated

# 002 - Accept a friend request ^002fuc
## preconditions:
- None

## Flow of events:
1. The user press *Friend* button in the interface
2. The user select *Pair* option in the selection menu
4. The user stay visible in the lan for 30 seconds
5. A new window is open showing request loads and visible time left
6. An confirmation popup is raised showing the other user informations (as described in [[#^fuc001|001 use case]])
7. The user interacts with confirm popup
8. The response is showed and the Pair window is closed with popup

## Postconditions
- If friend request is accepted:
	- The new friend must be showed in the friends list
	- The new friend relationship is stored in database as well friends informations
- if friend is rejected:
	- The friendslist is not updated