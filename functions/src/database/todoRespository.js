import db from "../firestore/config";
import prapareDocs from "../helpers/prapareDocs";
const todoRef = db.collection("todos");

export async function getListTodo(sort = "ASC", limit = 0) {
  const todos = await todoRef
    .orderBy("createAt", sort)
    .limit(Number(limit))
    .get();

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
  const update = ids.map(async (id) => {
    return todoRef.doc(`${id}`).update({
      completed: true,
      updatedAt: new Date(),
    });
  });
  return await Promise.all(update);
}

export async function removeManyTodo(ids = []) {
  const todoRemove = ids.map((id) => todoRef.doc(String(id)).delete());

  return await Promise.all(todoRemove);
}
