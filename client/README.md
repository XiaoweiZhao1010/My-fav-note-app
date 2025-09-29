# My Final Project for CS50

## Project Title: My Fav Note App

### Description

My Fav Note App is a simple yet powerful note-taking application that allows users to:

- Compose, save, edit, and delete notes
- Organize notes by tags
- Sign up and log in with secure authentication
- Benefit from full backend support (user authentication and SQL database for storing notes)

The project was built using **HTML**, **CSS**, and **JavaScript (React)** for the frontend, and **Node.js**, **Express.js**, and **PostgreSQL** for the backend.

---

### How to Run the Project

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm**
- **PostgreSQL**

#### 1. Clone the Repository

```bash
    git clone https://github.com/XiaoweiZhao1010/My-fav-note-app.git
    cd NOTE
```

2. **Install Dependencies**:

From the project root:
cd note-app-backend
npm install
Then install frontend dependencies:
cd ../NOTE
npm install

3. Start the Backend:
   cd note-app-backend
   npm start
   This will start the Express server on http://localhost:5050

4. Start the Frontend:
   cd ../note
   npm start
   This will start the frontend at http://localhost:5173

### Folder Structure

<details>
<summary>Click to expand</summary>

NOTE/
├── note-app-backend/ # Backend folder
│ ├── db/ # Database setup scripts
│ ├── routes/ # API route handlers
│ │ ├── authRoutes.js # Routes for user authentication
│ │ └── noteRoutes.js # Routes for note-related operations
│ ├── middleware/ # Middleware functions
│ │ └── verifyToken.js # JWT authentication middleware
│ ├── utils/ # Utility functions
│ │ └── sendError.js # Error handling utility
│ ├── .env # Environment variables (DB connection, JWT secret)
│ ├── server.js # Entry point for the backend
│ └── package.json # Backend dependencies and scripts
│
├── note/ # Frontend folder
│ ├── public/ # Static assets
│ │ └── favicon.ico
│ ├── src/ # Source code
│ │ ├── components/ # React components
│ │ ├── styles/ # CSS files
│ │ │ └── App.css
│ │ ├── utils/ # Utility functions
│ │ │ └── axios.js
│ │ ├── App.jsx # Main React component
│ │ └── index.jsx # Entry point
│ └── package.json # Frontend dependencies and scripts
│
└── README.md # Project documentation

</details>

### Database Schema

-- users table
CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

-- notes table
CREATE TABLE notes (
id SERIAL PRIMARY KEY,
title TEXT,
content TEXT,
tag TEXT,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

### License

This project is open-source and free to use under the [MIT License](./LICENSE).
