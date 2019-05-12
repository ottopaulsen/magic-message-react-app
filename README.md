
# MagicMessage React App

This is the React based app for my MMM-MessageToScreen module, which is a module for MagicMirror. See my [magic](https://github.com/ottopaulsen/magic) repository for more information.

The app is used to send messages to the magic mirror module.

I have two versions of the app. One with Angular and one with React.

## Install development environment

Clone the repository from github. 

Copy the `.env.dummy` file to a `.env.development` file for development, and a `.env.production` file for production, and fill in the correct values from yur Firebase project.

Run npm install:

```
npm install
```

## Run locally


Then when to start the server locally:

```
npm start
```

## Deploy

Make sure you have the correct `.env.production` file (see above).

```
npm run build
firebase deploy --only hosting
```
