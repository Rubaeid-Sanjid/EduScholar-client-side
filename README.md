# EduScholar

Live Site: https://eduscholar-434da.web.app

## About
It is a scholarship management website. Users can apply for university scholarships and admin can manage all scholarships. This type of application helps students to get affordable scholarships. Students get scholarships from all kinds of universities from a single website and they can apply for that.

## Features:
* Registration and Login with firebase
* Google login authentication
* Payment method with stripe
* Apply for scholarship
* Three types of user dashboard
* Admin and moderator can add & manage scholarship by posting and updating
* Admin can manage users by giving them user role 
* Admin and moderator can manage applied scholarship by rejecting and giving feedback
* Users can post review for scholarships
* Admin and moderator can manage review by deleting

## Technology used: 
* React Js
* Tailwind CSS
* Firebase 
* mongoDB

## Steps to follow if you want to run locally:

1. Clone the repository

2. Install dependencies for both the client and server directories
* For the client:
- cd client
- npm install
* For the server:
- cd server
- npm install

3. Set up Firebase
* Go to the Firebase Console.
* Create a new project or use an existing one.
* Add a web app to your Firebase project.
* Copy the Firebase config object and replace the placeholder in your code (usually found in client/src/firebaseConfig.js).

4. Set up MongoDB
* Make sure MongoDB is installed and running on your machine.
* Create a .env file in the server directory and add your MongoDB connection string.

5. Start the client and server development servers

6. Access the application
