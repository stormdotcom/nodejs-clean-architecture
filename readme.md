

# 🧱 Clean Architecture Node.js Example

A production-grade **Node.js + Express + PostgreSQL + Drizzle ORM** backend built using **Clean Architecture** principles.

This repo is designed to **teach** how to build scalable, maintainable backend app
---

## 🚀 Tech Stack

* **Node.js** – runtime
* **Express** – HTTP layer
* **Drizzle ORM** – type-safe PostgreSQL ORM
* **JWT + bcrypt** – authentication
* **Dotenv** – config management
* **Clean Architecture** – separation of concerns

---

## 🧩 What is “Clean Architecture”?

> “The business rules don’t depend on frameworks.
> The frameworks depend on the business rules.” – *Uncle Bob*

Clean Architecture separates your code into **layers**, each with a clear purpose:

```
src/
├── domain/           ← Core business logic (no frameworks)
├── infrastructure/   ← DB, ORM, external libs
├── interfaces/       ← Express controllers, routes, middlewares
└── app.js            ← Composition root (wires everything together)
```

### Layers Overview

| Layer              | Responsibility                    | Depends On |
| ------------------ | --------------------------------- | ---------- |
| **Domain**         | Entities & use cases (core logic) | Nothing    |
| **Infrastructure** | DB, ORM, crypto, external APIs    | Domain     |
| **Interfaces**     | Controllers, routes, web adapters | Domain     |
| **App / Root**     | Dependency wiring                 | All        |

**Goal:**
Each layer is replaceable — swap Express for Fastify or Postgres for Mongo, and the domain code stays untouched.

---

## ⚙️ Folder Structure

```
src/
├── app.js
├── domain/
│   └── user/
│       ├── UserEntity.js
│       ├── UserUseCases.js
│       └── AuthUseCases.js
├── infrastructure/
│   ├── db/
│   │   ├── drizzle.js
│   │   └── schema.js
│   ├── repositories/
│   │   └── UserRepository.js
│   └── services/
│       ├── PasswordService.js
│       └── TokenService.js
├── interfaces/
│   ├── controllers/
│   │   ├── UserController.js
│   │   └── AuthController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── authRoutes.js
│   └── middlewares/
│       └── authMiddleware.js
└── utils/
    └── response.js
```

---

## 🛠️ Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/clean-architecture-node.git
cd clean-architecture-node
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env`

```bash
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/yourdb
JWT_SECRET=supersecretkey
```

### 4. Run migrations (Drizzle)

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 5. Start the server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

* **POST `/api/auth/register`** → Create new user + JWT
* **POST `/api/auth/login`** → Validate credentials + return JWT
* **Protected routes** (like `/api/users`) require:

  ```
  Authorization: Bearer <token>
  ```

---

## 📚 Example Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login and get token        |
| GET    | `/api/users`         | Get all users (protected)  |
| GET    | `/api/users/:id`     | Get user by ID (protected) |
| PUT    | `/api/users/:id`     | Update user (protected)    |
| DELETE | `/api/users/:id`     | Delete user (protected)    |

---

## 🧠 Why This Architecture Is “Clean”

✅ **No framework lock-in** – You can replace Express or Drizzle easily.
✅ **Domain-focused** – Business logic doesn’t care about HTTP or DB details.
✅ **Highly testable** – You can unit test use cases without spinning up a server.
✅ **Low coupling, high cohesion** – Each part of the system has a single reason to change.

---

## 🧪 Testing Strategy (Recommended)

| Layer          | Test Type   | Example                              |
| -------------- | ----------- | ------------------------------------ |
| Domain         | Unit        | Test `UserUseCases` directly         |
| Infrastructure | Integration | Test repository queries with test DB |
| Interface      | E2E         | Hit API endpoints with Supertest     |

---

## 🧰 Scripts

| Command                    | Description               |
| -------------------------- | ------------------------- |
| `npm run dev`              | Start server with nodemon |
| `npm run start`            | Start production build    |
| `npx drizzle-kit generate` | Generate SQL migrations   |
| `npx drizzle-kit push`     | Apply migrations to DB    |

---

## 🧩 Key Concepts Recap

* **Domain** → *What your app does* (business logic)
* **Infrastructure** → *How it does it* (DB, tools)
* **Interface** → *How others use it* (HTTP, CLI, etc.)
* **Dependency Rule:**

  > Only depend inward. Outer layers know about inner ones, never the reverse.

---

## 🧠 Learning Path

If you’re new to Clean Architecture in Node.js:

1. Start with **simple CRUD** in one file.
2. Split logic into **controllers** and **repositories**.
3. Introduce **use cases** to isolate business rules.
4. Add **services** for security, storage, and external systems.
5. Stop touching everything at once — **keep dependencies going inward.**

