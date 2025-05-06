import { NOT_FOUND, REASON_PHRASES } from "@/http-status";
import db from "@/db";
import type { Context } from "hono";
import { getAllModelIds, getModelById, rowToModel } from "@/services";
import type { ModelInfo } from "@/types";

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
	return c.json({ models: getAllModelIds() });
};

/**
 * Create a new model
 */
export const createModel = async (c: Context) => {
	try {
		const body = (await c.req.json()) as ModelInfo;

		// Format data for DB storage
		const stmt = db.prepare(`
			INSERT INTO model_info (
				id, name, description, strengths, context, outputLimit, 
				inputCost, outputCost, systemPrompt, input, output
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

		stmt.run(
			body.id,
			body.name,
			body.description,
			body.strengths,
			body.context,
			body.outputLimit,
			body.inputCost,
			body.outputCost,
			body.systemPrompt ? 1 : 0,
			JSON.stringify(body.input),
			JSON.stringify(body.output),
		);

		return c.json(
			{
				success: true,
				message: `Model '${body.id}' created successfully`,
				model: body.id,
			},
			201,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: `Failed to create model: ${error instanceof Error ? error.message : String(error)}`,
			},
			400,
		);
	}
};

/**
 * Update an existing model
 */
export const updateModel = async (c: Context) => {
	try {
		const modelName = c.req.param("modelName");
		const body = (await c.req.json()) as Partial<ModelInfo>;

		// Check if model exists
		const exists = db
			.prepare("SELECT id FROM model_info WHERE id = ?")
			.get(modelName);
		if (!exists) {
			return c.json(
				{
					status: NOT_FOUND,
					message: `${REASON_PHRASES[NOT_FOUND]}: Model '${modelName}' not found`,
				},
				NOT_FOUND,
			);
		}

		// Build update query dynamically based on provided fields
		const fields = [];
		const values = [];

		// Add each field to update
		if (body.name) {
			fields.push("name = ?");
			values.push(body.name);
		}
		if (body.description) {
			fields.push("description = ?");
			values.push(body.description);
		}
		if (body.strengths) {
			fields.push("strengths = ?");
			values.push(body.strengths);
		}
		if (body.context !== undefined) {
			fields.push("context = ?");
			values.push(body.context);
		}
		if (body.outputLimit !== undefined) {
			fields.push("outputLimit = ?");
			values.push(body.outputLimit);
		}
		if (body.inputCost !== undefined) {
			fields.push("inputCost = ?");
			values.push(body.inputCost);
		}
		if (body.outputCost !== undefined) {
			fields.push("outputCost = ?");
			values.push(body.outputCost);
		}
		if (body.systemPrompt !== undefined) {
			fields.push("systemPrompt = ?");
			values.push(body.systemPrompt ? 1 : 0);
		}
		if (body.input !== undefined) {
			fields.push("input = ?");
			values.push(JSON.stringify(body.input));
		}
		if (body.output !== undefined) {
			fields.push("output = ?");
			values.push(JSON.stringify(body.output));
		}

		// Add model ID at the end for the WHERE clause
		values.push(modelName);

		if (fields.length === 0) {
			return c.json({ success: false, message: "No fields to update" }, 400);
		}

		// Execute update
		const sql = `UPDATE model_info SET ${fields.join(", ")} WHERE id = ?`;
		db.prepare(sql).run(...values);

		return c.json({
			success: true,
			message: `Model '${modelName}' updated successfully`,
			model: modelName,
		});
	} catch (error) {
		return c.json(
			{
				success: false,
				message: `Failed to update model: ${error instanceof Error ? error.message : String(error)}`,
			},
			400,
		);
	}
};

/**
 * Delete a model
 */
export const deleteModel = (c: Context) => {
	const modelName = c.req.param("modelName");

	// Check if model exists
	const exists = db.prepare("SELECT id FROM model_info WHERE id = ?").get(modelName);
	if (!exists) {
		return c.json(
			{
				status: NOT_FOUND,
				message: `${REASON_PHRASES[NOT_FOUND]}: Model '${modelName}' not found`,
			},
			NOT_FOUND,
		);
	}

	// Delete the model
	db.prepare("DELETE FROM model_info WHERE id = ?").run(modelName);

	return c.json({
		success: true,
		message: `Model '${modelName}' deleted successfully`,
	});
};
