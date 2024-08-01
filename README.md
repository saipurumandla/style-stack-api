# Style Stack API

## Description
Style Stack API is a backend service for managing style-related data. It uses Node.js, Express, and MongoDB.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/style-stack-api.git
    cd style-stack-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```properties
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/<database_name>
    JWT_SECRET=your_jwt_secret_key
    ```

## Running the Application

To start the server in development mode with `nodemon`, run:
```sh
npm run dev
