"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prapareDocs;
function prapareDocs(docs) {
  return docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
}
//# sourceMappingURL=prapareDocs.js.map