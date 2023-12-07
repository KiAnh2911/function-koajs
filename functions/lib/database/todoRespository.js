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
async function getListTodo(sort = "ASC", limit = 0) {
  const todos = await todoRef.orderBy("createAt", sort).limit(Number(limit)).get();
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
  const update = ids.map(async id => {
    return todoRef.doc(`${id}`).update({
      completed: true,
      updatedAt: new Date()
    });
  });
  return await Promise.all(update);
}
async function removeManyTodo(ids = []) {
  const todoRemove = ids.map(id => todoRef.doc(String(id)).delete());
  return await Promise.all(todoRemove);
}
//# sourceMappingURL=todoRespository.js.map