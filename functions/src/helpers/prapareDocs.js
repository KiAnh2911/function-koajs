export default function prapareDocs(docs) {
  return docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}
