import type { Context, Next } from "hono";

// Hardcoded API key for admin operations
const API_KEY = "iam-admin-chinni"; // Example UUID

/**
 * Middleware to check for admin API key
 * Only requests with the correct X-API-Key header can access CUD operations
 */
export const requireApiKey = async (c: Context, next: Next) => {
	const apiKey = c.req.header("X-API-Key");

	if (!apiKey || apiKey !== API_KEY) {
		return c.json(
			{
				status: 401,
				message: "Unauthorized: Valid API key required for this operation",
			},
			401,
		);
	}

	await next();
};
