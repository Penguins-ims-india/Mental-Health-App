# Healthier
## Your Personal Mental Health Tracker
Healthier is an app for anyone who wants to take care of their mental health. With Healthier, a user can journal, keep track of their moods, and track any habits they'd like to keep up with day to day.

# CONCEPTS
## GOOGLE AUTH
We used google authentication to allow users to sign into our application. All of this was done by using Passport in our server files and creating OAuth 2.0 Client IDs in Google Cloud in the APIs & Services section.

## HOME PAGE
The first page a user sees once they log-in.
Includes these features: A Welcome (user's name)! greeting, a weather component that takes in the user's IP address to get their city, state, and country to get the current daily weather for their area, and buttons to navigate to the main features of the app.
When initially opening the app using local host, many of the features on this page will not work. The Welcome (user's name) won't show up and neither will the weather data. This will show up only on a deployed instance.

## JOURNAL
The journal feature allows a user to add a title to their journal, type their entry, and save it. Once the journal is saved, all journal entries can be seen on the bottom of the page, and it also includes the date the journal was made. You are then able to click a button to read the entry which takes you to a new view of just the journal in its entirety and here you can edit the journal. You can also delete the journal. You can also scroll through and see all the journals a user has made.

## MOODS
The moods feature allows a user to document their mood using a chart. We have 5 standard moods: happy, hopeful, content, worried, and sad. A user is able to click on the specific mood.

## HABITS
Allows you to track your habits that you want to do from day to day. It has a streak feature that will update you habit streak every night showing how long you have been doing a habit for. 

Healthier is a full stack web app made with MERN stack with mysql.

## [Our Stack](./techStack.png)


This project was created by Alex Hebert, Arina Nasri, Josh Roberts and Patrick Henry as our greenfield project for Operation Spark.

[Press release](./_PRESS-RELEASE.md)

## Getting Started

### Dev setup

1. Fork this repo and clone it down
2. If you're not already, install and use node 22
    * Run `nvm install 22` to install
    * Run `nvm use 22` to switch to node 22
    * Verify with `node --version`
3. Install node packages with `npm i`
4. Build the dist folder with `npm run build`
5. start the mysql daemon with `mysql.server start`
6. Start the server `npm start`
7. Open the page by cmd/ctrl + click the output in the terminal

## Env Variables
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
VISUAL_CROSSING_API_KEY=

[Contribution guide](./CONRIBUTING.md)
[Style guide](./STYLE-GUIDE.md)