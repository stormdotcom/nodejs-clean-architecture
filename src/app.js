import dotenv from "dotenv";
import express from "express";
import { db } from "./infrastructure/db/drizzle.js";
import { UserRepository } from "./infrastructure/repositories/UserRepository.js";
import { UserController } from "./interfaces/controllers/UserController.js";
import routes from "./interfaces/routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

// dependency injection
const userRepo = new UserRepository(db);
const userController = new UserController(userRepo);

app.use("/api", routes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
