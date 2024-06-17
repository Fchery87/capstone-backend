# Capsule Event Hub

## Description
Capsule Event Hub is a full-stack web application for managing events, built with MongoDB, Express, React, and Node.js (MERN stack). Users can create, view, update, and delete events, and RSVP to events.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Fchery87/capstone-backend.git
   cd capstone-backend

## Installation

Install dependencies:

```bash
  npm install my-project
  cd my-project
```

Set up environment variables:
Create a .env file in the root directory with the following content:

ATLAS_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

Start the server:
npm start



## Technologies Used

**Node.js**

**Express**

**MongoDB**

**Mongoose**

**JWT**

**Multer**


## API End Points

POST /api/auth/register: Register a new user

POST /api/auth/login: Login a user

POST /api/events: Create a new event

GET /api/events: Get all events

GET /api/events/:id: Get a single event by ID

PUT /api/events/:id: Update an event by ID

DELETE /api/events/:id: Delete an event by ID

POST /api/events/:id/rsvp: RSVP to an event



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ATLAS_URI`: MongoDB connection string

`JWT_SECRET`: Secret key for JWT


## Contributing

## How to Contribute
Fork the repository

Create a new branch (git checkout -b feature-branch)

Make your changes and commit them (git commit -m 'Add new feature')

Push to the branch (git push origin feature-branch)

Create a new Pull Request
## License

Specify the license under which the project is distributed.

