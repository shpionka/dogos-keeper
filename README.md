## Dogos Keeper

Dogos Keeper app lets you pick and save cute shiba dogos to your personal account.

It's based on `http://shibe.online` API as a great source of dogo images and fun!

### DEMO 
[https://dogos-keeper.web.app/](https://dogos-keeper.web.app/)

![Alt text](https://user-images.githubusercontent.com/9405042/74861912-6b88c700-534b-11ea-8b71-9ab873322608.png?raw=true "Title")

Dogos Keeper has been built with:
 - React/Redux + hooks 
 - Firebase functions + Express as a server and Firestore as a storage
 - Client bundle is hosted on Firebase hosting
 - Creating personal account is done with Firebase Auth + Github as OAuth provider

How to run the project:

```shell script
# Server 
yarn fn:serve

# Client webpack dev server
yarn start

# Build
yarn build

# Deploy functions
yarn fn:deploy

# Deploy client to Firebase hosting
yarn hosting:deploy
```




