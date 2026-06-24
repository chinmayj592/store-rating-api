# Store Rating API

Backend API for store rating system with user authentication, role-based access control, and store management.

## Features

- User authentication (signup, login, password update)
- Role-based access control (ADMIN, USER, STORE_OWNER)
- Store CRUD operations
- Rating submission and management
- Admin dashboard
- Store owner dashboard

## Tech Stack

- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT authentication
- Joi validation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` with your database URL and JWT secret

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Start server:
```bash
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `PATCH /api/auth/password` - Update password (authenticated)

### Users (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details

### Stores
- `GET /api/stores` - List stores
- `GET /api/stores/:id` - Get store details
- `POST /api/stores` - Create store (admin only)
- `PATCH /api/stores/:id` - Update store (admin only)
- `DELETE /api/stores/:id` - Delete store (admin only)

### Ratings (User only)
- `POST /api/ratings` - Submit/update rating
- `GET /api/ratings/store/:storeId` - Get user's rating for store
- `DELETE /api/ratings/store/:storeId` - Delete rating

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `POST /api/admin/users` - Create user with role

### Store Owner
- `GET /api/store-owner/dashboard` - Owner's store ratings
