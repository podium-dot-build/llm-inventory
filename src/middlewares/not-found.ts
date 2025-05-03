import { NOT_FOUND, REASON_PHRASES } from "@/http-status";
import type { NotFoundHandler } from "hono";

/**
 * Not Found Handler Middleware
 * Returns a standardized 404 response when a route is not found
 */
const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			status: NOT_FOUND,
			message: `${REASON_PHRASES[NOT_FOUND]} - ${c.req.path}`,
		},
		NOT_FOUND,
	);
};

export default notFound;
