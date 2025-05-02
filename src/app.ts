import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/error", () => {
	throw new Error("Test error");
});

// 404 handler
app.notFound((c) => {
	return c.text("Custom 404 Message", 404);
});

// 500 handler
app.onError((err, c) => {
	console.error(`${err}`);
	return c.text("Custom Error Message", 500);
});

export default app;
