import express from "express";

export const userRoutes = (userController) => {
  const router = express.Router();

  router.post("/", userController.create);
  router.get("/", userController.getAll);
  router.get("/:id", userController.getById);
  router.put("/:id", userController.update);
  router.delete("/:id", userController.delete);

  return router;
};
