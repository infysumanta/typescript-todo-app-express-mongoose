import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import config from "../src/config";
import Todo, { ITodo } from "../src/models/todo.schema";

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await Todo.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Todo API Test", () => {
  it("Should Return an array of Todos", async () => {
    const todos = [
      {
        task: "Todo 1",
      },
      {
        task: "Todo 2",
      },
      {
        task: "Todo 3",
      },
    ];
    await Todo.insertMany(todos);
    const res = await request(app).get("/todos");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(3);
    expect(res.body.map((t: ITodo) => t.task)).to.include.members(
      todos.map((t) => t.task)
    );
  });

  it("Should Create a Todo", async () => {
    const todo = { task: "Todo 1" };
    const res = await request(app).post("/todos").send(todo);
    expect(res.status).to.equal(201);
    expect(res.body.task).to.equal(todo.task);
  });

  it("Should Update a Todo", async () => {
    const todo = await Todo.create({ task: "todo 1" });
    const updatedTodo = { done: true };
    const res = await request(app)
      .patch(`/todos/${todo._id}`)
      .send(updatedTodo);
    expect(res.status).to.equal(200);
    expect(res.body.done).to.equal(true);
  });
  it("Should Delete a Todo", async () => {
    const todo = await Todo.create({ task: "todo 1" });
    const res = await request(app).delete(`/todos/${todo._id}`);
    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
  });
});
