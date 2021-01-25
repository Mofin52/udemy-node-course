import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { getDb } from "../helpers/db_client.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface MongoTodo {
  _id: ObjectId;
  text: string;
}

router.get("/todos", async (ctx) => {
  const todos: MongoTodo[] = await getDb().collection("todos").find(); // [{_id: ObjectId(), text: '...'}]
  const finalTodos = todos.map((t: MongoTodo) => {
    return { id: t._id.$oid, text: t.text };
  });
  ctx.response.body = { todos: finalTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: data.text,
  };

  const id = await getDb().collection("todos").insertOne(newTodo);
  newTodo.id = id.$oid;

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body().value;

  await getDb()
    .collection("todos")
    .updateOne(
      { _id: ObjectId(tid) },
      {
        $set: {
          text: data.value.text,
        },
      }
    );

  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  await getDb()
    .collection("todos")
    .deleteOne({ _id: ObjectId(tid) });
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
