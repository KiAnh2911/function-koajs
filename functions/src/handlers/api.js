import Koa from "koa";
import cors from "@koa/cors";
// import { koaBody } from "koa-body";
import router from "../routers/router";

const app = new Koa();

app.use(cors());
// app.use(koaBody({ parsedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }));
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
