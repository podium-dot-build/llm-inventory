import { NOT_FOUND, REASON_PHRASES } from "@/http-status";
import { getAllModelIds, getModelById } from "@/services";
import type { Context } from "hono";

/**
 * Get a specific model by ID
 */
export const getModel = (c: Context) => {
	const modelName = c.req.param("modelName");
	const model = getModelById(modelName);

	if (model) {
		return c.json(model);
	}

	return c.json(
		{
			status: NOT_FOUND,
			message: `${REASON_PHRASES[NOT_FOUND]}: Model '${modelName}' not found`,
		},
		NOT_FOUND,
	);
};

/**
 * List all available models
 */
export const listModels = (c: Context) => {
	return c.json({
		models: getAllModelIds(),
	});
};
