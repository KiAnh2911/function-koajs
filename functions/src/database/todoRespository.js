import db from "../firestore/config";
import prapareDocs from "../helpers/prapareDocs";

const todoRef = db.collection("todos");
const batch = db.batch();

export async function getListTodo(sort = "ASC", limit = 10) {
  let queryTodos = todoRef;

  if (sort) {
    queryTodos = queryTodos.orderBy("createAt", sort);
  }
  if (limit) {
    queryTodos = queryTodos.limit(Number(limit));
  }

  const todos = await queryTodos.get();

  return prapareDocs(todos.docs);
}

export async function addTodo(data) {
  const todo = {
    createAt: new Date(),
    ...data,
    completed: false,
  };

  const respon = await todoRef.add(todo);

  return { id: respon.id, ...todo };
}

export async function updateTodos(ids = []) {
  ids.map(async (id) => {
    const update = todoRef.doc(id);
    batch.update(update, { completed: true, updatedAt: new Date() });
  });

  return await batch.commit();
}

export async function removeManyTodo(ids = []) {
  const todoRemove = ids.map((id) => todoRef.doc(String(id)).delete());
  batch.delete(todoRemove);

  return await batch.commit();
}
