import Todo from "./../models/todo.schema";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new Todo({
      task: req.body.task,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({ error: "Todo not found" });
    }
    todo.done = req.body.done;
    await todo.save();
    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({ error: "Todo not found" });
    }
    await todo.remove();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error });
  }
};
