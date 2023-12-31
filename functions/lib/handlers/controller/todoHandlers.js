"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.getTodos = getTodos;
exports.removeMany = removeMany;
exports.updataMany = updataMany;
var _todoRespository = require("../../database/todoRespository");
async function getTodos(ctx) {
  try {
    const {
      limit,
      sort
    } = ctx.query;
    const data = await (0, _todoRespository.getListTodo)(sort, limit);
    ctx.status = 200;
    ctx.body = {
      todo: data
    };
  } catch (error) {
    console.log("error getTodos:", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function add(ctx) {
  try {
    const postData = ctx.request.body || ctx.req.body;
    const data = await (0, _todoRespository.addTodo)(postData);
    ctx.status = 201;
    return ctx.body = {
      success: true,
      todo: data
    };
  } catch (error) {
    console.log("error add:", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
}
async function updataMany(ctx) {
  try {
    const todos = ctx.request.body || ctx.req.body;
    const update = await (0, _todoRespository.updateTodos)(todos);
    ctx.status = 200;
    ctx.body = {
      success: true,
      todo: update
    };
  } catch (error) {
    console.log("error update: ", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      todo: [],
      error: error.message
    };
  }
}
async function removeMany(ctx) {
  try {
    const id = ctx.request.body || ctx.req.body;
    const remove = await (0, _todoRespository.removeManyTodo)(id);
    ctx.status = 200;
    ctx.body = {
      success: true,
      todo: remove
    };
  } catch (error) {
    console.log("error remove", error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      todo: [],
      error: error.message
    };
  }
}
//# sourceMappingURL=todoHandlers.js.map