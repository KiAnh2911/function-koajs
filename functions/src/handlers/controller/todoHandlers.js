import {
  getListTodo,
  getAdd,
  removeManyTodo,
  updateTodos,
} from "../../database/todoRespository";

export async function getTodos(ctx) {
  try {
    const { limit, sort } = ctx.query;

    const data = await getListTodo(sort, limit);
    ctx.status = 200;
    ctx.body = {
      todo: data,
    };
  } catch (error) {
    console.log("error getTodos:", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
}

export async function addTodo(ctx) {
  try {
    const postData = ctx.request.body || ctx.req.body;
    console.log("postData", postData);
    const data = await getAdd(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      todo: data,
    });
  } catch (error) {
    console.log("error add:", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      data: [],
      error: error.message,
    };
  }
}

export async function updataMany(ctx) {
  try {
    const todos = ctx.request.body || ctx.req.body;
    const update = await updateTodos(todos);
    ctx.status = 200;
    ctx.body = {
      success: true,
      todo: update,
    };
  } catch (error) {
    console.log("error update: ", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      todo: [],
      error: error.message,
    };
  }
}

export async function removeMany(ctx) {
  try {
    const id = ctx.request.body || ctx.req.body;
    const remove = await removeManyTodo(id);
    ctx.status = 200;
    ctx.body = {
      success: true,
      todo: remove,
    };
  } catch (error) {
    console.log("error remove", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      todo: [],
      error: error.message,
    };
  }
}
