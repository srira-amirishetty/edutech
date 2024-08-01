live link : https://edutech-yse2.onrender.com

![Screenshot (517)](https://github.com/user-attachments/assets/8ae63d0a-9aba-4d70-8cd9-f78ae088521b)
![Screenshot (512)](https://github.com/user-attachments/assets/11e7b845-76a0-492a-80a9-ad9852f4944b)
![Screenshot (513)](https://github.com/user-attachments/assets/ca250468-8676-4871-9c9d-b80559a696e0)
![Screenshot (514)](https://github.com/user-attachments/assets/9fb1e8a8-fd13-4463-b7d0-449af490eb31)
![Screenshot (515)](https://github.com/user-attachments/assets/cf6556b3-afac-4012-bf68-f369845856d1)
![Screenshot (516)](https://github.com/user-attachments/assets/4d5a9a7f-2a3d-4a45-9874-343342d09d5e)

Features
User Authentication (Login/Signup)
Role-based Access Control (Teacher/Student)
Create, Read, Update, Delete (CRUD) operations for tests
Take tests and submit responses
View test results

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm installed on your machine. Download and install from Node.js official website.
MongoDB installed and running on your local machine or a MongoDB Atlas cluster. Visit MongoDB official website for instructions.

Installation
Clone the repository
git clone https://github.com/srira-amirishetty/edutech
cd edutech

Setup
npm install

Create a .env file in the backend directory and add the following environment variables:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
port=5000

API Documentation
Authentication Routes
Register a new user

POST https://edutech-yse2.onrender.com/auth/register
Request Body:

json
Copy code
{
    "username": "string",
    "password": "string",
    "role": "string" // "teacher" or "student"
}

Login

POST https://edutech-yse2.onrender.com/auth/login
Request Body:

json
{
    "username": "string",
    "password": "string"
}
Response:

json
{
    "token": "string",
    "role": "string"
}


Test Routes
Create a new test

POST https://edutech-yse2.onrender.com/tests/create-test
Request Body:

{
    "title": "string",
    "description": "string",
    "questions": [
        {
            "text": "string",
            "options": ["string", "string", "string", "string"],
            "correctOption": "string"
        }
    ]
}


Headers:

{
    "Authorization": "Bearer token"
}

Get all tests

GET https://edutech-yse2.onrender.com/tests

Headers:
{
    "Authorization": "Bearer token"
}

Get test by ID

GET https://edutech-yse2.onrender.com/tests/:test_id
Headers:

{
    "Authorization": "Bearer token"
}

Results Routes
Get results for a specific test

GET https://edutech-yse2.onrender.com/results/:test_id
Headers:

{
    "Authorization": "Bearer token"
}

Get all results for a specific test (Teacher only)

GET https://edutech-yse2.onrender.com/results/all/:test_id
Headers:

{
    "Authorization": "Bearer token"
}
