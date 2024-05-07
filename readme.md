# inIT Job Search Backend

### Welcome to inIT Job Search Backend - Where Data Management Begins!

I developed a comprehensive backend system following RESTful API principles, handling various routes and enabling data retrieval from a relational PostgreSQL database. I implemented security measures such as Express-Validator and JSON Web Tokens for user authentication and profile storage.

I enhanced search and filtering functionality by implementing pagination and user-inputted filtering options directly from the database through SQL commands. I further utilized advanced SQL commands and functionalities to optimize search functionalities, including creating relationships between many-to-many tables for effectiveness, scalability, and optimization.

### Table of Contents

- [Frontend Repo](#init-job-search-frontend-repo)
- [Live Site](#init-live-site)
- [Setup Locally](#setup-locally)
- [Technologies Used](#technologies-used)
- [LinkedIn Profile](https://www.linkedin.com/in/destinyjoyner/)

### Setup Locally

1. **Clone the repository:**
```bash
git clone https://github.com/DestinyJoyner/Init-Job-Search-Backend.git
```

2. **Navigate to the project directory:**
```bash
cd Init-Job-Search-Backend
```
3. **Create a .env file with the following variables:**
```bash
PG_HOST=
PG_PORT=
PG_DATABASE=
PG_USER=
```
4. **Install dependencies:**
```bash
npm install
```
5. **Start the development server:**
```bash
npm start
```

### Technologies Used
- Express
- bcrypt
- CORS
- dotenv
- Express-Validator
- JSON Web Tokens
- Morgan
- pg-promise