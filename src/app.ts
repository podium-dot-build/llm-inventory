import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Main application instance
 * Configures the OpenAPI-enabled Hono app with routes and middleware
 */
const app = new OpenAPIHono();

// Health check endpoint
app.get("/", (c) => {
	return c.json({
		status: "ok",
		version: "1.0.0",
	});
});

// Test error endpoint
app.get("/error", () => {
	throw new Error("Test error");
});

// Register global middleware
app.notFound(notFound);
app.onError(onError);

export default app;
