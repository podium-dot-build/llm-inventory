import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";

import { openAPISchema } from "@/config/openapi-schema";

/**
 * Main application instance
 * Configures the OpenAPI-enabled Hono app with routes and middleware
 */
const app = new OpenAPIHono();

// Global middleware
app.use("*", logger());

// API Documentation
app.get(
	"/reference",
	Scalar({
		spec: { url: "/openapi.json" },
		theme: "kepler",
		pageTitle: "AI Model Info API",
	}),
);

// OpenAPI schema endpoint
app.get("/openapi.json", (c) => c.json(openAPISchema));

// Health check endpoint
app.get("/", (c) =>
	c.json({
		status: "ok",
		version: "1.0.0",
	}),
);

// Test error endpoint
app.get("/error", () => {
	throw new Error("Test error");
});

// Error handling middleware
app.notFound(notFound);
app.onError(onError);

export default app;
