# Auth API

A simple authentication API built with Node.js/Express. This project provides basic authentication endpoints such as user registration and login, suitable for use in web and mobile applications.

## Features

- User registration and authentication
- Secure password hashing
- RESTful API structure
- Easy to extend and integrate

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedMahfouz5/auth-api.git
   cd auth-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add your configuration:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/authdb
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint        | Description           |
|--------|----------------|-----------------------|
| POST   | /api/register  | Register new user     |
| POST   | /api/login     | Login user            |

### Example: Register

```http
POST /api/register
Content-Type: application/json

{
  "email": "testuser@gmail.com",
  "password": "password123"
}
```

### Example: Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "testuser@gmail.com",
  "password": "password123"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcryptjs

## containarization 
- Docker
- Docker compose

## CI/CD 
- Jenkins

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/ahmedMahfouz5/auth-api/issues).

## License

This project is licensed under the MIT License.

---

**Author:** [ahmedMahfouz5](https://github.com/ahmedMahfouz5)
