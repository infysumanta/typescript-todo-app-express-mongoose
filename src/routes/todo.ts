import { Router } from "express";
import * as TodoController from "../controllers/todo.controller";

const router = Router();

router.route("/").get(TodoController.getTodos).post(TodoController.createTodo);
router
  .route("/:id")
  .patch(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

export default router;
