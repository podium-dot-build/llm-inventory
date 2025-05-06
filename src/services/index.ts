import type { ModelInfo } from "@/types";
import db from "@/db";

// Raw DB row representation type
type RawModelRow = Omit<ModelInfo, "systemPrompt" | "input" | "output"> & {
	systemPrompt: number;
	input: string;
	output: string;
};

/**
 * Transform a raw database row into a ModelInfo object
 */
export function rowToModel(row: RawModelRow): ModelInfo {
	return {
		...row,
		systemPrompt: Boolean(row.systemPrompt),
		input: JSON.parse(row.input),
		output: JSON.parse(row.output),
	};
}

/**
 * Get a model by ID
 */
export const getModelById = (id: string): ModelInfo | null => {
	const row = db.prepare("SELECT * FROM model_info WHERE id = ?").get(id) as
		| RawModelRow
		| undefined;
	return row ? rowToModel(row) : null;
};

/**
 * Get a list of all model IDs
 */
export const getAllModelIds = (): string[] => {
	const rows = db.prepare("SELECT id FROM model_info").all() as Array<{ id: string }>;
	return rows.map((r) => r.id);
};
