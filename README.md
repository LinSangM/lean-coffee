It is a fun app for to have a lean coffee workshop. Enter room to create different topics and start your coffee time together with your friends. 

When you are ready to your topics, click on "start" to start your lean coffee time. Each topic owns 3 min discuss time and 15 second voting (thumbs up/down) time. If the voting gets more thumbs down than thumbs up, it will automaticly jump to next topic. If not so, it will automaticly stay at the same topic, 3 min discuss timer will reset directly. No votes happened ? it will stay at the same question forever. (It is not so smart to handle this case so far.)

You could click on "next topic" / "previous topic" to jump to / back between different topics. Or stop the lean coffee time by clicking on "finish game".

## How to use it in a real enviroment 

If you want to run it and share with different client side (different computer, mobile or tablet) at the same time, hosting the server and app on a real server or share your local host in a sharable network.

## Before you start

Git clone the repository and run npm install in the civet-v2 folder. 

This is app is a labatory idea, it is not complete yet.. If you like it, check out the to do list and have fun!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm run server`

It will start the node.js server in the localhost with port:4000. Please keep the server is running while you use the app. 

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Want to get some fun of it ?

To do to make this app even better:
* Add css to beautify the UI
* Add Redux to manage one room state. Sync state to NodeJS server throught the Redux. This will be cool. (today, it seperates in different components) 
* Implement rooms system, allow users to create different room and join different room.


