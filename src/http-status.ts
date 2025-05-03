import type { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * HTTP Status Codes
 * Typed for compatibility with Hono's ContentfulStatusCode
 */

// 2xx Success
export const OK = 200 as ContentfulStatusCode;
export const CREATED = 201 as ContentfulStatusCode;
export const ACCEPTED = 202 as ContentfulStatusCode;
export const NO_CONTENT = 204 as ContentfulStatusCode;

// 3xx Redirection
export const MOVED_PERMANENTLY = 301 as ContentfulStatusCode;
export const FOUND = 302 as ContentfulStatusCode;
export const SEE_OTHER = 303 as ContentfulStatusCode;
export const NOT_MODIFIED = 304 as ContentfulStatusCode;
export const TEMPORARY_REDIRECT = 307 as ContentfulStatusCode;
export const PERMANENT_REDIRECT = 308 as ContentfulStatusCode;

// 4xx Client Errors
export const BAD_REQUEST = 400 as ContentfulStatusCode;
export const UNAUTHORIZED = 401 as ContentfulStatusCode;
export const PAYMENT_REQUIRED = 402 as ContentfulStatusCode;
export const FORBIDDEN = 403 as ContentfulStatusCode;
export const NOT_FOUND = 404 as ContentfulStatusCode;
export const METHOD_NOT_ALLOWED = 405 as ContentfulStatusCode;
export const NOT_ACCEPTABLE = 406 as ContentfulStatusCode;
export const REQUEST_TIMEOUT = 408 as ContentfulStatusCode;
export const CONFLICT = 409 as ContentfulStatusCode;
export const GONE = 410 as ContentfulStatusCode;
export const UNPROCESSABLE_ENTITY = 422 as ContentfulStatusCode;
export const TOO_MANY_REQUESTS = 429 as ContentfulStatusCode;

// 5xx Server Errors
export const INTERNAL_SERVER_ERROR = 500 as ContentfulStatusCode;
export const NOT_IMPLEMENTED = 501 as ContentfulStatusCode;
export const BAD_GATEWAY = 502 as ContentfulStatusCode;
export const SERVICE_UNAVAILABLE = 503 as ContentfulStatusCode;
export const GATEWAY_TIMEOUT = 504 as ContentfulStatusCode;

/**
 * HTTP Status Phrases
 */
export const REASON_PHRASES = {
	// 2xx
	[OK]: "OK",
	[CREATED]: "Created",
	[ACCEPTED]: "Accepted",
	[NO_CONTENT]: "No Content",

	// 3xx
	[MOVED_PERMANENTLY]: "Moved Permanently",
	[FOUND]: "Found",
	[SEE_OTHER]: "See Other",
	[NOT_MODIFIED]: "Not Modified",
	[TEMPORARY_REDIRECT]: "Temporary Redirect",
	[PERMANENT_REDIRECT]: "Permanent Redirect",

	// 4xx
	[BAD_REQUEST]: "Bad Request",
	[UNAUTHORIZED]: "Unauthorized",
	[PAYMENT_REQUIRED]: "Payment Required",
	[FORBIDDEN]: "Forbidden",
	[NOT_FOUND]: "Not Found",
	[METHOD_NOT_ALLOWED]: "Method Not Allowed",
	[NOT_ACCEPTABLE]: "Not Acceptable",
	[REQUEST_TIMEOUT]: "Request Timeout",
	[CONFLICT]: "Conflict",
	[GONE]: "Gone",
	[UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
	[TOO_MANY_REQUESTS]: "Too Many Requests",

	// 5xx
	[INTERNAL_SERVER_ERROR]: "Internal Server Error",
	[NOT_IMPLEMENTED]: "Not Implemented",
	[BAD_GATEWAY]: "Bad Gateway",
	[SERVICE_UNAVAILABLE]: "Service Unavailable",
	[GATEWAY_TIMEOUT]: "Gateway Timeout",
} as const;
