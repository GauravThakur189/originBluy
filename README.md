# Media Capture and Storage Web Application

This project is a full-stack web application built with the MERN stack that allows users to upload, view, and manage media files (images & videos). Media files are securely stored in an AWS S3 bucket, and metadata is saved in a MongoDB database using Mongoose. User authentication is handled via JWT with password hashing using bcrypt.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:**
  - User registration and login using JWT.
  - Password hashing with bcrypt for enhanced security.

- **Media Upload & Management:**
  - Upload images and videos via a simple interface.
  - Media files stored in AWS S3 (with public-read access) or a backend folder (using Multer).
  - View uploaded media in a responsive gallery.
  - Delete media files from both AWS S3 and the database.
  
- **Backend API & Database:**
  - RESTful API endpoints built with Express.
  - MongoDB (using Mongoose) stores media metadata including filename, URL, upload date, and user reference.
  
- **Frontend UI/UX:**
  - Responsive design built with React.
  - State management using Redux Toolkit or Context API.
  
- **Error Handling & Validation:**
  - Robust error handling on both backend and frontend.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit/Context API, Material-UI/Tailwind CSS
- **Backend:** Node.js, Express, JWT, bcrypt, AWS SDK (v2) with multer-s3
- **Database:** MongoDB (via Mongoose & MongoDB Atlas)
- **Storage:** AWS S3
- **Deployment:** Vercel/Netlify (Frontend), Render/Heroku/Vercel (Backend)

## Project Structure

The repository is organized as a monorepo with separate folders for the frontend and backend:




## Installation

### Prerequisites

- Node.js and npm installed
- Git
- MongoDB Atlas account (or local MongoDB)
- AWS account with an S3 bucket configured

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/GauravThakur189/originBluy.git
   cd originBluy
Navigate to the server directory:

bash
Copy
Edit
cd server
Install Dependencies:

bash
Copy
Edit
npm install
Create a .env File in the server Directory:

Example .env content:

env
Copy
Edit
PORT=1000
MONGO_URI=your_mongodb_connection_string
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET=your_s3_bucket_name
JWT_SECRET=gaurav123
Start the Backend Server:

bash
Copy
Edit
npm start
The backend should now be running at http://localhost:1000.

Frontend Setup
Navigate to the client Directory:

Open a new terminal window:

bash
Copy
Edit
cd originBluy/client
Install Dependencies:

bash
Copy
Edit
npm install
Start the Frontend:

bash
Copy
Edit
npm start
The frontend will typically run on http://localhost:3000.

Running the Project
Backend: Run from the /server directory with npm start. Ensure your .env file is configured.
Frontend: Run from the /client directory with npm start.
Testing
You can test the API endpoints using Postman or a similar API testing tool.

User Authentication
Sign Up:

Method: POST
URL: http://localhost:1000/api/sign-in
Body (JSON):
json
Copy
Edit
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "yourpassword"
}
Log In:

Method: POST
URL: http://localhost:1000/api/log-in
Body (JSON):
json
Copy
Edit
{
  "username": "testuser",
  "password": "yourpassword"
}
Response: On successful login, you'll receive a JWT token. Use this token for subsequent requests by setting the header:
makefile
Copy
Edit
Authorization: Bearer <your-token>
Media Management
Upload Media:

Method: POST
URL: http://localhost:1000/api/v2/media/upload
Headers:
Authorization: Bearer <your-token>
Body: Use form-data with the key media (type: File)
Get Media Files:

Method: GET
URL: http://localhost:1000/api/v2/media
Headers:
Authorization: Bearer <your-token>
Delete Media File:

Method: DELETE
URL: http://localhost:1000/api/v2/media/<file_id>
Headers:
Authorization: Bearer <your-token>
