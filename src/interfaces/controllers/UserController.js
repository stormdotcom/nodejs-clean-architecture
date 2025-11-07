import { UserUseCases } from "../../domain/user/UserUseCases.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export class UserController {
  constructor(userRepo) {
    this.useCase = new UserUseCases(userRepo);
  }

  create = async (req, res) => {
    try {
      const user = await this.useCase.createUser(req.body);
      successResponse(res, "User created", user, 201);
    } catch (err) {
      errorResponse(res, err.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const users = await this.useCase.getAllUsers();
      successResponse(res, "All users", users);
    } catch (err) {
      errorResponse(res, err.message);
    }
  };

  getById = async (req, res) => {
    try {
      const user = await this.useCase.getUserById(Number(req.params.id));
      successResponse(res, "User found", user);
    } catch (err) {
      errorResponse(res, err.message, 404);
    }
  };

  update = async (req, res) => {
    try {
      const user = await this.useCase.updateUser(Number(req.params.id), req.body);
      successResponse(res, "User updated", user);
    } catch (err) {
      errorResponse(res, err.message);
    }
  };

  delete = async (req, res) => {
    try {
      const result = await this.useCase.deleteUser(Number(req.params.id));
      successResponse(res, result.message);
    } catch (err) {
      errorResponse(res, err.message);
    }
  };
}
