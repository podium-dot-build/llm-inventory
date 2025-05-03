import { INTERNAL_SERVER_ERROR, REASON_PHRASES } from "@/http-status";
import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";

/**
 * Global Error Handler
 * Handles different types of errors and provides consistent error responses
 */
const onError: ErrorHandler = (err, c) => {
	// If it's a Hono HTTP exception, use its built-in response
	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	// Environment check for showing stack traces
	const isProduction = (c.env?.NODE_ENV || process.env?.NODE_ENV) === "production";

	// Standard error response format
	return c.json(
		{
			status: INTERNAL_SERVER_ERROR,
			message: err.message || REASON_PHRASES[INTERNAL_SERVER_ERROR],
			stack: isProduction ? undefined : err.stack,
		},
		INTERNAL_SERVER_ERROR,
	);
};

export default onError;
