import { z } from "zod";

/**
 * Schema definitions for API models
 */
// Define modality type schema
const ModalityTypeSchema = z.object({
	type: z.enum(["text", "image", "audio", "video", "file"]).describe("Media type"),
	extensions: z.array(z.string()).describe("Supported file extensions"),
});

/**
 * Schema matching the ModelInfo type
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
	input: z.array(ModalityTypeSchema).describe("Supported input modalities"),
	output: z.array(ModalityTypeSchema).describe("Supported output modalities"),
	systemPrompt: z.boolean().describe("Whether system prompts are supported"),
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
	components: {
		securitySchemes: {
			apiKey: {
				type: "apiKey",
				in: "header",
				name: "X-API-Key",
				description: "API key for administrative operations",
			},
		},
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
											description: "Context window size in tokens",
										},
										outputLimit: {
											type: "number",
											description: "Output token limit",
										},
										inputCost: {
											type: "number",
											description:
												"Pricing in dollars ($) per million input tokens",
										},
										outputCost: {
											type: "number",
											description:
												"Pricing in dollars ($) per million output tokens",
										},
										strengths: {
											type: "string",
											description: "Key strengths of the model",
										},
										systemPrompt: {
											type: "boolean",
											description:
												"Whether system prompts are supported",
										},
										input: {
											type: "array",
											items: {
												type: "object",
												properties: {
													type: {
														type: "string",
														enum: [
															"text",
															"image",
															"audio",
															"video",
															"file",
														],
														description:
															"Input modality type",
													},
													extensions: {
														type: "array",
														items: { type: "string" },
														description:
															"Supported file extensions",
													},
												},
											},
											description: "Supported input modalities",
										},
										output: {
											type: "array",
											items: {
												type: "object",
												properties: {
													type: {
														type: "string",
														enum: [
															"text",
															"image",
															"audio",
															"video",
															"file",
														],
														description:
															"Output modality type",
													},
													extensions: {
														type: "array",
														items: { type: "string" },
														description:
															"Supported file extensions",
													},
												},
											},
											description: "Supported output modalities",
										},
									},
									example: {
										id: "claude-3-7-sonnet",
										name: "Claude 3.7 Sonnet",
										description:
											"Our most intelligent model with extended thinking mode and multimodal capabilities",
										strengths:
											"Highest intelligence and capability with toggleable extended reasoning",
										context: 200000,
										outputLimit: 64000,
										inputCost: 3.0,
										outputCost: 15.0,
										systemPrompt: true,
										input: [
											{
												type: "text",
												extensions: ["txt", "html", "md"],
											},
											{
												type: "image",
												extensions: [
													"png",
													"jpg",
													"jpeg",
													"gif",
													"webp",
												],
											},
										],
										output: [
											{
												type: "text",
												extensions: ["txt", "html", "md"],
											},
										],
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
			put: {
				summary: "Update an AI model",
				description: "Update an existing AI model's information",
				tags: ["Models"],
				security: [{ apiKey: [] }],
				parameters: [
					{
						name: "modelName",
						in: "path",
						required: true,
						schema: { type: "string" },
						description: "The ID of the model to update",
					},
					{
						name: "X-API-Key",
						in: "header",
						required: true,
						schema: { type: "string" },
						description: "API key for authentication",
					},
				],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									name: { type: "string", description: "Model name" },
									description: {
										type: "string",
										description: "Model description",
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
										description: "Input cost per token",
									},
									outputCost: {
										type: "number",
										description: "Output cost per token",
									},
									strengths: {
										type: "string",
										description: "Key model strengths",
									},
									systemPrompt: {
										type: "boolean",
										description:
											"Whether the model supports system prompts",
									},
									input: {
										type: "array",
										items: { type: "object" },
										description: "Supported input modalities",
									},
									output: {
										type: "array",
										items: { type: "object" },
										description: "Supported output modalities",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Model updated successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: {
											type: "boolean",
											description: "Operation success status",
										},
										message: {
											type: "string",
											description: "Success message",
										},
										model: {
											type: "string",
											description: "ID of the updated model",
										},
									},
								},
							},
						},
					},
					"400": {
						description: "Invalid request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: {
											type: "boolean",
											description: "Operation success status",
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
					"401": {
						description: "Unauthorized - Invalid or missing API key",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										status: { type: "number", example: 401 },
										message: {
											type: "string",
											example:
												"Unauthorized: Valid API key required for this operation",
										},
									},
								},
							},
						},
					},
				},
			},
			delete: {
				summary: "Delete an AI model",
				description: "Remove a model from the database",
				tags: ["Models"],
				security: [{ apiKey: [] }],
				parameters: [
					{
						name: "modelName",
						in: "path",
						required: true,
						schema: { type: "string" },
						description: "The ID of the model to delete",
					},
					{
						name: "X-API-Key",
						in: "header",
						required: true,
						schema: { type: "string" },
						description: "API key for authentication",
					},
				],
				responses: {
					"200": {
						description: "Model deleted successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: {
											type: "boolean",
											description: "Operation success status",
										},
										message: {
											type: "string",
											description: "Success message",
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
					"401": {
						description: "Unauthorized - Invalid or missing API key",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										status: { type: "number", example: 401 },
										message: {
											type: "string",
											example:
												"Unauthorized: Valid API key required for this operation",
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
			post: {
				summary: "Create a new AI model",
				description: "Create a new model in the database",
				tags: ["Models"],
				security: [{ apiKey: [] }],
				parameters: [
					{
						name: "X-API-Key",
						in: "header",
						required: true,
						schema: { type: "string" },
						description: "API key for authentication",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: [
									"id",
									"name",
									"description",
									"context",
									"outputLimit",
									"inputCost",
									"outputCost",
								],
								properties: {
									id: {
										type: "string",
										description: "Unique model identifier",
									},
									name: { type: "string", description: "Model name" },
									description: {
										type: "string",
										description: "Model description",
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
										description: "Input cost per token",
									},
									outputCost: {
										type: "number",
										description: "Output cost per token",
									},
									strengths: {
										type: "string",
										description: "Key model strengths",
									},
									systemPrompt: {
										type: "boolean",
										description:
											"Whether the model supports system prompts",
									},
									input: {
										type: "array",
										items: {
											type: "object",
											properties: {
												type: {
													type: "string",
													description:
														"Input type (e.g., text, image)",
												},
												extensions: {
													type: "array",
													items: { type: "string" },
													description:
														"Supported file extensions",
												},
											},
										},
										description: "Supported input modalities",
									},
									output: {
										type: "array",
										items: {
											type: "object",
											properties: {
												type: {
													type: "string",
													description:
														"Output type (e.g., text, image)",
												},
												extensions: {
													type: "array",
													items: { type: "string" },
													description:
														"Supported file extensions",
												},
											},
										},
										description: "Supported output modalities",
									},
								},
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Model created successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: {
											type: "boolean",
											description: "Operation success status",
										},
										message: {
											type: "string",
											description: "Success message",
										},
										model: {
											type: "string",
											description: "ID of the created model",
										},
									},
								},
							},
						},
					},
					"400": {
						description: "Invalid request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: {
											type: "boolean",
											description: "Operation success status",
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
