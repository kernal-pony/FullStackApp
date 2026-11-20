# Full Stack Application

## Project Overview
This project is a full-stack web application developed using React for the frontend, Node.js and Express.js for the backend, and PostgreSQL for database management. It provides user registration and login functionality along with an authenticated dashboard that displays user information dynamically.

## Technologies Used
- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JSON Web Token (JWT)
- Password Security: bcrypt
- API Communication: Axios
- Version Control: Git and GitHub

## Features
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected dashboard route
- Dynamic retrieval of user information from the database
- PostgreSQL database integration
- Frontend and backend API integration
- User logout functionality

## Project Structure

FullStackApp/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   └── auth.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── .gitignore

## Database
PostgreSQL is used to store user information. The database contains a users table with the following fields:

- id
- name
- email
- password
- created_at

## Application Workflow
1. A new user registers by providing their name, email and password.
2. The backend validates the registration request.
3. The password is hashed using bcrypt before being stored in the database.
4. The registered user can log in using their credentials.
5. After successful authentication, a JWT token is generated.
6. The token is used to access the protected dashboard.
7. The dashboard retrieves and displays the authenticated user's information from the PostgreSQL database.

## API Endpoints

### Authentication
- POST /api/auth/register — Register a new user.
- POST /api/auth/login — Authenticate an existing user.

### Dashboard
- GET /api/dashboard — Retrieve authenticated user's dashboard information.

## Installation and Execution

### Backend
1. Navigate to the backend folder.
2. Install dependencies:
   npm install
3. Configure database credentials and JWT secret in the .env file.
4. Start the backend server:
   npm run dev

### Frontend
1. Navigate to the frontend folder.
2. Install dependencies:
   npm install
3. Start the frontend:
   npm run dev

## Conclusion
The project successfully demonstrates full-stack application development, REST API integration, database connectivity, user authentication, protected routes and dynamic data retrieval using React, Node.js, Express.js and PostgreSQL.
