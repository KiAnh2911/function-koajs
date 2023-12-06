"use strict";

var _koa = _interopRequireDefault(require("koa"));
var _cors = _interopRequireDefault(require("@koa/cors"));
var _router = _interopRequireDefault(require("../routers/router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { koaBody } from "koa-body";

const app = new _koa.default();
app.use((0, _cors.default)());
// app.use(koaBody({ parsedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }));
app.use(_router.default.routes());
app.use(_router.default.allowedMethods());
module.exports = app;
//# sourceMappingURL=api.js.map