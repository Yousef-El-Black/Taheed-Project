# Taheed Full-Stack App

An App to Rent Motocycles Online.

## Table of Contents

- [Taheed Full-Stack App](#taheed-full-stack-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [.env File Structure](#env-file-structure)

## Introduction

the Client-Side show everything for customer, there's an independent side for Admins and Staff (Admin-side) to Control App totally flexible, and responsive. This app Specially made to make it easy for admins and Clients before.

## Technologies Used

- Client-Side: HTML, CSS, JavaScript, React, Typescript, Tailwind, React Router, Redux, MUI Material, Axios.
- Admin-Side: HTML, CSS, JavaScript, React, Typescript, Redux, React Router, Axios, SASS.
- Server-Side: Node.js, Express, Bcrypt, JWT, Nodemailer.
- Database: MongoDB, Mongoose.

## Installation

Steps to set up the project locally.

1. Clone the repository
   ```bash
   git clone https://github.com/Yousef-El-Black/Taheed-Project.git
   ```
2. Navigate to:

   - Server Side

     ```bash
     cd server
     ```

   - Admin Side

     ```bash
     cd admin
     ```

   - Client Side

     ```bash
     cd client
     ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Set up environment variables

   - Create a `.env` file in the root directory
   - Add the necessary variables as shown in down

5. Run the application

   ```bash
   npm start
   ```

### .env File Structure

- Admin Side

  ```
  REACT_APP_SERVER_URL
  ```

- Server Side

  ```
  PORT
  EMAIL_GMAIL
  EMAIL_PASS
  MONGODB_URI
  PEPPER
  SALT
  CLOUDINARY_NAME
  CLOUDINARY_KEY
  CLOUDINARY_SECRET
  JWT_SEC
  ```

- Client Side
  ```
  REACT_APP_SERVER_URL
  ```
