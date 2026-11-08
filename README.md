# Passport Auth

A small web app with sign up, login, and a protected profile page, built with Node.js, Express, and Passport.js. It uses sessions instead of tokens, and the pages are rendered on the server with EJS. I built it to learn how session-based authentication works and how Passport fits into an Express app.

## What does this project do?

A visitor can create an account with a full name, username, and password. After logging in, the server keeps the user logged in with a session cookie, so they can open their profile page without signing in again. Logged-in users cannot see the login and register pages, and guests cannot see the profile page. Logging out clears the session.

## Main Features

- Sign up with full name, username, and password
- Password hashing with bcrypt
- Login with Passport.js using the local (username and password) strategy
- Session-based authentication with express-session
- A protected profile page that only logged-in users can open
- Middleware that redirects guests to the login page, and logged-in users away from the login and register pages
- Flash messages for errors such as a duplicate username or a wrong password
- Logout through a POST request
- One shared error handler and a 404 page

## Tech Stack

| Area | Technology |
|---|---|
| Runtime & framework | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | Passport.js, passport-local |
| Sessions | express-session |
| Password hashing | bcrypt |
| Views | EJS, express-ejs-layouts, Bootstrap 5 (CDN) |
| Flash messages | express-flash |
| Configuration | dotenv |

## Routes

| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/` | Everyone | Home page |
| GET | `/register` | Guests only | Sign up form |
| POST | `/register` | Guests only | Create a new account |
| GET | `/login` | Guests only | Login form |
| POST | `/login` | Guests only | Log in |
| GET | `/profile` | Logged-in users | Profile page |
| POST | `/logout` | Logged-in users | Log out |

## Installation & Running

You need Node.js and a running MongoDB instance (local or Atlas).

```bash
# install dependencies
npm install

# create the env file and fill in the values
cp .env.example .env

# run the project
npm start

# or run with auto-restart while developing
npm run dev
```

Then open `http://localhost:3000` (or the port you set in `.env`).

## Environment Variables

Set these in your `.env` file:

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on |
| `DB_URL` | MongoDB connection string |
| `SESSION_SECRET` | Secret used to sign the session cookie (use a long, random value) |

## Project Structure

```
├── app.js                # app setup and server start
├── passport.config.js    # Passport strategy and session handling
├── middleware.js         # checks for logged-in users and guests
├── error.handling.js     # shared error handler and 404 page
├── model/                # Mongoose user model
├── routes/               # all routes
└── views/                # EJS pages
    └── layout/           # shared page layout
```

## Scope

This is a learning project. Sessions are kept in the server's memory, so restarting the server logs everyone out. Before using something like this for real, I would store sessions in the database, add rate limiting on login, and add stronger password rules.
