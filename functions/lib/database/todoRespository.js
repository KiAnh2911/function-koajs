"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = addTodo;
exports.getListTodo = getListTodo;
exports.removeManyTodo = removeManyTodo;
exports.updateTodos = updateTodos;
var _config = _interopRequireDefault(require("../firestore/config"));
var _prapareDocs = _interopRequireDefault(require("../helpers/prapareDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _config.default.collection("todos");
const batch = _config.default.batch();
async function getListTodo(sort = "ASC", limit = 10) {
  let queryTodos = todoRef;
  if (sort) {
    queryTodos = queryTodos.orderBy("createAt", sort);
  }
  if (limit) {
    queryTodos = queryTodos.limit(Number(limit));
  }
  const todos = await queryTodos.get();
  return (0, _prapareDocs.default)(todos.docs);
}
async function addTodo(data) {
  const todo = {
    createAt: new Date(),
    ...data,
    completed: false
  };
  const respon = await todoRef.add(todo);
  return {
    id: respon.id,
    ...todo
  };
}
async function updateTodos(ids = []) {
  ids.map(async id => {
    const update = todoRef.doc(id);
    batch.update(update, {
      completed: true,
      updatedAt: new Date()
    });
  });
  return await batch.commit();
}
async function removeManyTodo(ids = []) {
  const todoRemove = ids.map(id => todoRef.doc(String(id)).delete());
  batch.delete(todoRemove);
  return await batch.commit();
}
//# sourceMappingURL=todoRespository.js.map