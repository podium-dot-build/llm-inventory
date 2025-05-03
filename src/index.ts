import app from "@/app";
import modelsRouter from "@/routes/models";

// Server configuration
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3002;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Register routes
app.route("/", modelsRouter);

// Start the server
const server = Bun.serve({
	fetch: app.fetch,
	port: PORT,
	development: !IS_PRODUCTION,
});

console.log(
	`Server is running on http://${server.hostname}:${server.port} (${IS_PRODUCTION ? "production" : "development"} mode)`,
);
