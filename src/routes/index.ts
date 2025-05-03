import { getModel, listModels } from "@/controllers";
import { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Models API Router
 */
const modelsRouter = new OpenAPIHono();

// Get specific model information
modelsRouter.get("/model/:modelName", getModel);

// List all available models
modelsRouter.get("/models", listModels);

export default modelsRouter;
