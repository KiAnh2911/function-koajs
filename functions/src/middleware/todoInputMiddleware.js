import * as yup from "yup";

export default async function todoInputMiddleware(ctx, next) {
  try {
    const todo = ctx.request.body;
    let schema = yup.object().shape({
      title: yup.string().required(),
    });

    await schema.validate(todo);
    await next();
  } catch (error) {
    console.log("error middleware: ", error);
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: error.message,
      errorName: error.name,
    };
  }
}
