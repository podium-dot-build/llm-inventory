import {
	getModel,
	listModels,
	createModel,
	updateModel,
	deleteModel,
} from "@/controllers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { requireApiKey } from "@/middlewares/auth";

/**
 * Models API Router
 */
const modelsRouter = new OpenAPIHono();

// Get specific model information
modelsRouter.get("/model/:modelName", getModel);

// List all available models
modelsRouter.get("/models", listModels);

// Create a new model
modelsRouter.post("/models", requireApiKey, createModel);

// Update an existing model
modelsRouter.put("/model/:modelName", requireApiKey, updateModel);

// Delete a model
modelsRouter.delete("/model/:modelName", requireApiKey, deleteModel);

export default modelsRouter;
