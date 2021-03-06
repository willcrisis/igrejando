# Igrejando

Igrejando is an app for managing churches, and providing a safe place for church members to interact.
 
## Technology Stack

Igrejando is built using following technologies:

* [Sails](http://sailsjs.org/) for backend,
* [React](https://reactjs.org/) + [Redux](https://redux.js.org/) for frontend
* [Firebase](https://firebase.google.com/) for user management,
* [PostgreSQL](https://www.postgresql.org/) (but you can customize and use any database you want)

## Getting Started

* First of all, clone this repo
* In root folder, run `yarn` or `npm install`
* Create a new app in Firebase (See [Firebase docs](https://firebase.google.com/docs/?authuser=0) for more information)
* Allow desired social networks in Firebase
* Copy `.env.example` file in root folder to `.env` and change it's informations to match your [Firebase configs](https://firebase.google.com/docs/web/setup?authuser=0)
* Get your `serviceAccountKey.json` 
(See [Google Cloud Platform docs](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#createanewserviceaccount) 
to see how to get it), convert it to 1-line json and add it to `FIREBASE_SERVICE_ACCOUNT_KEY` variable in `.env` file 
(or create an environment variable with that value)
(or create environment variables matching the ones existing in this file)
* Set `DATABASE_URL` variable in `.env` file (or create an environment variable) with your database connection data 
* Run `yarn dev` or `npm run dev` command

## Building Production Version
 
* Run `yarn build` or `npm run build` to build `assets` folder with optimized bundles. After that, run `yarn start` or `npm start` to run server.

## Deploying to Heroku

* Fork this repo
* Create an account on [Heroku](https://www.heroku.com)
* Create a new app on Heroku, and set deployments to your GitHub repository
* In [Firebase Console](https://console.firebase.google.com/), go to the app you created in [Getting Started](#getting-started), 
navigate to Authentication -> Login Method and add `your-heroku-app.herokuapp.com` to Authorized Domains list
* Back to Heroku dashboard, click on `Settings` tab, then in `Reveal Config Vars` button and add all environment variables 
existing in `.env.example` file, with your values.
* Go to Deploy, and in page bottom, click on `Deploy Branch` button.
* That's it.
 
## Contributing

Feel free for forking this project an open issues or PRs.
