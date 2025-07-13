# Leaderboard App

A simple full-stack leaderboard application using Node.js, Express, MongoDB (backend) and React.js (frontend).

## Features
- Select and add users
- Claim random points (1-10) for users
- See live leaderboard and claim history

## Getting Started

### Backend
1. Go to `backend` folder
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server: `npm start`

### Frontend
1. Go to `frontend` folder
2. Install dependencies: `npm install`
3. Create a `.env` file with your backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the app: `npm start`

## Deployment
- [Demo](https://leaderboard-w3.vercel.app)

