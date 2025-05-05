import { z } from "zod";

/**
 * Schema definitions for API models
 */
export const ModelSchema = z.object({
	id: z.string().describe("Unique model identifier"),
	name: z.string().describe("Model name"),
	description: z.string().describe("Brief description of the model"),
	context: z.number().describe("Context window size"),
	outputLimit: z.number().describe("Output token limit"),
	inputCost: z.number().describe("Input cost per token"),
	outputCost: z.number().describe("Output cost per token"),
	strengths: z.string().describe("Key strengths of the model"),
	supports: z.array(z.string()).describe("Supported prompt types"),
});

export const ErrorResponseSchema = z.object({
	status: z.number().describe("HTTP status code"),
	message: z.string().describe("Error message"),
});

export const ModelsListSchema = z.object({
	models: z.array(z.string()).describe("List of all model IDs"),
});

/**
 * OpenAPI schema for the entire API
 */
export const openAPISchema = {
	openapi: "1.0.0",
	info: {
		title: "AI Model Info API",
		version: "1.0.0",
		description: "API for accessing information about AI models",
	},
	servers: [
		{
			url: "/",
			description: "Current server",
		},
	],
	paths: {
		"/model/{modelName}": {
			get: {
				summary: "Get AI model information",
				description: "Retrieve detailed information about a specific AI model",
				tags: ["Models"],
				parameters: [
					{
						name: "modelName",
						in: "path",
						required: true,
						schema: {
							type: "string",
						},
						description: "The name of the model to fetch",
					},
				],
				responses: {
					"200": {
						description: "Model data retrieved successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "string",
											description: "Unique model identifier",
										},
										name: {
											type: "string",
											description: "Model name",
										},
										description: {
											type: "string",
											description: "Brief description of the model",
										},
										context: {
											type: "number",
											description: "Context window size",
										},
										outputLimit: {
											type: "number",
											description: "Output token limit",
										},
										inputCost: {
											type: "number",
											description: "Pricing for input tokens",
										},
										outputCost: {
											type: "number",
											description: "Pricing for output tokens",
										},
										strengths: {
											type: "string",
											description: "Key strengths of the model",
										},
										supports: {
											type: "array",
											items: {
												type: "string",
											},
											description: "Supported prompt types",
										},
									},
								},
							},
						},
					},
					"404": {
						description: "Model not found",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										status: {
											type: "number",
											description: "HTTP status code",
										},
										message: {
											type: "string",
											description: "Error message",
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/models": {
			get: {
				summary: "List all AI models",
				description: "Retrieve a list of all available AI models",
				tags: ["Models"],
				responses: {
					"200": {
						description: "Models list retrieved successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										models: {
											type: "array",
											items: {
												type: "string",
											},
											description: "List of all model IDs",
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/": {
			get: {
				summary: "Health check",
				description: "Check if the API is running",
				tags: ["System"],
				responses: {
					"200": {
						description: "API is running",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										status: {
											type: "string",
											description: "Status of the API",
										},
										version: {
											type: "string",
											description: "API version",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
