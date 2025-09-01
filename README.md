# 🎬 Movie Review & Watchlist App

A full-stack MERN (MongoDB, Express, React, Node.js) application where users can sign up, log in, create movie reviews, manage their watchlist, and update their profile with a profile picture.

---

## Features

- User Authentication (Signup/Login)
- Profile Management with Image Upload
- Add & View Movies
- Write Reviews with Star Ratings
- View All Reviews
- Add/Remove Movies from Watchlist
- Admin Access to Create Movies

---

## Tech Stack

| Frontend | Backend | Database | Cloud |
|----------|---------|----------|--------|
| React    | Node.js | MongoDB  | Cloudinary (Image Upload) |

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/Reyaz123ahmad/MovieReview.git
cd movie-review-app


2. Install dependencies
   Backend

   cd server
   npm install


    Frontend
    
    
    npm install


    Environment Variables
    Create a .env file in the server/ folder:

    env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret


    Running the App
    Backend
    bash
    cd movieReview-backend
    npm run dev
    Frontend
    
    npm start

#Foldaer Structure
    ├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/


#API Endpoints
 Auth
POST /api/v1/auth/signup

POST /api/v1/auth/login

PUT /api/v1/auth/updateUserProfile/:id

 Movies
GET /api/v1/movies

POST /api/v1/movies (Admin only)
Reviews
POST /api/v1/reviews

GET /api/v1/reviews/:userId

 Watchlist
POST /api/v1/watchlist/:userId

DELETE /api/v1/watchlist/:userId/:movieId