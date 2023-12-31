import Router from "koa-router";
import * as todosHandler from "../handlers/controller/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";
// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// router todo
router.get("/todos", todosHandler.getTodos);
router.post("/todo", todoInputMiddleware, todosHandler.add);
router.patch("/todos", todosHandler.updataMany);
router.delete("/todos", todosHandler.removeMany);

export default router;
