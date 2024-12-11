Speaker and Listener Booking System

The Speaker and Listener Booking System is an online platform that enables effective communication between speakers and listeners. It facilitates booking consultations, scheduling sessions, providing session feedback, and maintaining a seamless user experience for both speakers and listeners.

How to run the application locally

Clone the repository onto your desktop and navigate to the root directory. Run the command npm i to install all the necessary dependencies.

IMPORTANT: If you are using a local MongoDB database, do not forget to run the mongod command before starting the application.

After this, in the project directory, you can run the application using:

npm run dev

Runs the app in development mode and starts the backend server.Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.You may also see any lint errors in the console.

Make sure you use Node.js with version 20+.

npm run build

Builds the app for production to the build folder.It correctly bundles React in production mode and optimizes the build for the best performance.

Dependencies

Some of the important dependencies used in this project are:

express (v4.19.1): A Node.js web application framework that provides a set of features for building web applications, primarily used for the backend.

mongoose (v8.2.1): An Object Data Modelling (ODM) tool for MongoDB and Node.js.

react (v18.2.0): A frontend library for building user interfaces. React enables easy creation of interactive UIs using a declarative approach.

tailwindcss (v3.4.1): An open-source CSS framework that allows users to design directly within HTML.

dotenv (v16.4.5): Processes environment variables. Setup is explained below.

nodemon (v3.1.0): Automatically restarts the server on source file changes.

concurrently (v8.2.2): Runs multiple scripts simultaneously, enabling the frontend and backend servers to run together.

bcrypt (v5.1.1): Encrypts user passwords before storing them in the database.

Environment Variables

You need to create a .env file in the root directory of the project with the following content:

MONGO_URI = # MongoDB database URI. For local testing, use mongodb://localhost:27071/speaker_listener_booking
JWT_SECRET = # Generate a secure secret using a suitable script or generator and paste the output here
EMAIL = system.contact@proactivesolutions.com
APP_PASSWORD = # Contact us to fill this field

Features of the application

For Listeners

Filter and View Speakers

Book Sessions

View Pending Sessions

View Session Details

Provide Feedback for completed sessions

Receive important email notifications

For Speakers

Update Availability, Location, and Profile Details

View Incoming Session Requests

Accept or Reject Session Requests

Schedule a Session

Receive Feedback Notifications

Respond to Feedback

Credits

For any queries, bugs, or doubts, please contact:

Harsh Sahu

Developed and maintained by Proactive Solutions Pvt. Ltd.

