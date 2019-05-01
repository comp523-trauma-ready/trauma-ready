# Trauma Ready 
Master repository for all code related to the *Trauma Ready* mobile app, administrator portal, and backend server. 

For more information, visit our project [website](https://comp523-trauma-ready.github.io).

Built in collaboration with UNC Health Care for COMP 523, Spring 2019. 

## Overview

### What it does
The job of an EMT is not an easy one. For each incident, it roughly consists of a three step process: getting to the people who need help, stabilizing them, and figuring out how to get them the right level of care at the right trauma center. *Trauma Ready* is a cross-platform mobile app that assists paramedics in the last step of this process by providing a unified source of the information they need to make these routing decisions. Upon opening, the app provides a status feed of nearby hospitals that is customized to 
the user's location: 

![home](tr-frontend/screenshots/pixel-2/home.png?raw=true "Home")

*Trauma Ready* contains a directory of all trauma centers and activation criterias for participating hospitals in North Carolina. Each hospital profile contains address, contact, services, and activation criteria data for that particular location. 

![directory](tr-frontend/screenshots/pixel-2/directory.png?raw=true "Directory")
![hospital](tr-frontend/screenshots/pixel-2/hospital-top.png?raw=true "Hospital")

Lastly, maintaining accurate and recent information is essential for this app to be used by real paramedics in the field. We support this with an online administrator portal where credentialed users may update activation criterias as they change over time and 
automatically push these changes to the app. 

## Administrator Portal (Users)
The administrator portal is found at (https://statt-portal.herokuapp.com). It allows for administrators to access the information stored in the database that the application uses and make alterations as necessary. Administrators will need proper authentication to gain access to this information.

### Authentication
In order to access the deeper portions of the portal, Administrators must provided an approved login and password. They must also provide an approved login and password to be able to make new objects, update existing objects, or delete existing objects.

### Dashboard
After logging into the web portal, administrators are presented with a dashboard. This dashboard provides links to the different collections in the database. These collections are: [Hospitals](https://statt-portal.herokuapp.com/hospital), [RACs](https://statt-portal.herokuapp.com/rac), [Activations](https://statt-portal.herokuapp.com/activations), and [Traumas](https://statt-portal.herokuapp.com/trauma). Administrators also may register new administrators through the dashboard.

## Getting Started (Developers)

*Instructions currently only apply to Mac/Linux systems. Windows support in progress.*

### Backend
First, open up Terminal and make sure you have command line tools installed 

  `xcode-select --install`

You'll also need Node.js, which can be downloaded [here](https://nodejs.org/en/) or installed with Homebrew 

  `brew install node` 

Change into the backend directory and install its dependencies 

  `cd tr-backend && npm install` 

Finally, to run the backend locally you'll need credentials to access it's associated database on Heroku. Go to the team's Google Drive and download 'credentials.txt'. Place it under `trauma-ready/tr-backend/src/models` so that `db.js` may parse it in. You must also download from the team's Google Drive 'api_key.txt' and place it under `trauma-ready/tr-backend/src/routes` so that you connect to the Google Maps Geocoding API in `hospital.js`. Finally, `cd` back into the `tr-backend` directory and run 

  `npm start`

which should display a success message for both the server running locally and your connection to the database. Alternatively, one can run 
   `npm run start-watch`
   
for development programming.

Backend dependencies include: [Express](https://expressjs.com), [Express Handlebars](https://www.npmjs.com/package/express-handlebars), [Mongoose](https://mongoosejs.com/), [mongoose-auto-increment](https://www.npmjs.com/package/mongoose-auto-increment), [Google Maps](https://developers.google.com/maps/documentation/geocoding/intro), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [connect-flash](https://www.npmjs.com/package/connect-flash), [express-session](https://github.com/expressjs/session), [Passport](http://www.passportjs.org/), [passport-local](https://www.npmjs.com/package/passport-local) and [Body-Parser](https://www.npmjs.com/package/body-parser). [Nodemon](https://nodemon.io/) was also imported for development purposes.

### Heroku
Heroku is a cloud-based Platform as a Service (PaaS) on which the backend server and database of the application runs. It is through Heroku that the server connects with the MongoDB database using mLab MongoDB. To view the mLab interface for the given application, one need only login to Heroku, click on the link to the given application (named comp523-statt-web-portal), click on the resources header, and finally click on the link "mLab MongoDB."

The login information to Heroku and ownership of the account are, at the completion of the semester, handed over to the client for their possession and management.

### GitHub
The login information to the Github account (named comp523-trauma-ready) which contains the application repository (named trauma-ready) and ownership of the account are, at the completion of the semester, handed over to the client for their possession and management.

Note: Above is described a method of running the backend locally using the file credentials.txt. Due to the possibility of certain parties gaining undesirable access to the database, neither this file, nor any information stating the username or password of the database, should ever be stored in the GitHub repository. 

In order to connect the server with the database in a more secure fashion, under trauma-ready/tr-backend/src/models/db.js, mongoose should connect with the config var MONGODB_URI using process.env . Information on this config var can be accessed and managed using the information found at the following link: https://devcenter.heroku.com/articles/config-vars .

There is also a config var GOOGLE_MAPS_API_KEY on heroku, which is used in trauma-ready/tr-backend/src/routes/hospital.js to connect to the Google Maps Geocoding API for the actual Web Portal.

### Frontend

We use [Expo](https://expo.io/learn) to develop the React Native frontend. Their website provides detailed installation instructions, but assuming you have Node installed already you may simply run

  `npm install expo-cli --global`

Then 

  `cd tr-frontend && npm install`
  
  `npm start`
  
should open dev-tools and provide a barcode in your terminal that you may scan. You'll need to either develop the Expo mobile app to your physical device or acquire iOS and Android emulators from XCode and Android Studio respectively. Alternatively, Expo provides a browser based interface called [Snack](https://snack.expo.io). 

In order to view the application in its published state, follow the directions found [here](https://comp523-trauma-ready.github.io/getting-the-app.html) to view the application either on Expo or, if permission has been granted, on Google Play. 

## Testing 

Some testing of the Backend API was done using Postman. The Client has the login information to the Postman account, so that a future team may view and build on the tests made there. 

## References 

* [Express.js](https://expressjs.com)
* [Jest](https://jestjs.io)
* [Mongoose](https://mongoosejs.com)
* [Mocha](https://mochajs.org)
* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org)
