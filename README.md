
# Project & Task Management App

A full-stack application to manage projects and their associated tasks. Built using:

- Vite + React + TypeScript for the frontend
- Node.js + Express + MongoDB for the backend
- Secure JWT-based authentication
- CRUD for Projects and Tasks
- Reusable modals and responsive UI using Tailwind CSS

## Folder Structure

```
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.ts / app.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.tsx
│   └── vite.config.ts
└── README.md
```

## Features

- User Authentication (SignUp / SignIn)
- JWT Token Management
- Project CRUD
- Task CRUD (inside Project Detail)
- Reusable Modal UI
- API Layer (Axios) with Error Handling
- Pagination-ready Backend
- Responsive & Clean UI using Tailwind

## Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | React, Vite, TypeScript     |
| Styling   | Tailwind CSS                |
| State     | React Context, LocalStorage |
| Backend   | Node.js, Express            |
| DB        | MongoDB (Mongoose)          |
| Auth      | JWT                         |

## Setup Instructions

### 1. Backend

```bash
cd Server
npm install

# Add .env file
npm start

# For Seed
npm run seed
```

.env example:

```
PORT=8000
MONGODB_URI=mongodb://0.0.0.0:27017/dbName
JWT_TOKEN_SECRET_KEY=your_jwt_secret_token_12345
JWT_EXPIRY=7d
```

### 2. Frontend

```bash
cd Client
npm install
npm run dev
```

Make sure to configure axios base URL in `services/api.ts`:

```ts
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});
```

## API Endpoints

### Auth
| Method | Endpoint         | Description     |
|--------|------------------|-----------------|
| POST   | /auth/signUp     | Register user   |
| POST   | /auth/signIn     | Login + token   |

### Projects
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | /project/getAll      | Get all user projects  |
| GET    | /project/get/:id     | Get Single project     |
| POST   | /project/create      | Create new project     |
| PATCH  | /project/update/:id  | Update project         |
| DELETE | /project/delete/:id  | Delete project         |

### Tasks
| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| GET    | /task/get/:id            | Get all tasks in project |
| POST   | /task/create             | Create task              |
| PATCH  | /task/update/:id         | Update task              |
| DELETE | /task/delete/:id         | Delete task              |

## Author
Made by Rohit Singh
