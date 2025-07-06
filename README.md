
# Project & Task Management App

A full-stack application to manage projects and their associated tasks. Built using:

- Vite + React + TypeScript for the frontend
- Node.js + Express + MongoDB for the backend
- Secure JWT-based authentication
- Full CRUD for Projects and Tasks
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

- User Authentication (SignUp / Login)
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
cd backend
npm install
# Add .env file
npm run dev
```

.env example:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/project-manager
JWT_TOKEN_SECRET_KEY=your_jwt_secret
JWT_EXPIRY=1d
```

### 2. Frontend

```bash
cd frontend
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

| Method | Endpoint        | Description            |
|--------|------------------|------------------------|
| GET    | /projects        | Get all user projects  |
| POST   | /projects        | Create new project     |
| PUT    | /projects/:id    | Update project         |
| DELETE | /projects/:id    | Delete project         |

### Tasks

| Method | Endpoint                | Description              |
|--------|--------------------------|--------------------------|
| GET    | /tasks/byProject/:id     | Get all tasks in project |
| POST   | /tasks                   | Create task              |
| PUT    | /tasks/:id               | Update task              |
| DELETE | /tasks/:id               | Delete task              |

## Author

Made by [Your Name]

## License

MIT License
