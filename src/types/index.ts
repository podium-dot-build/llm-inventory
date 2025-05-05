/**
 * Represents information about an AI model
 */
export interface ModelInfo {
	/**
	 * Unique identifier
	 */
	id: string;

	/**
	 * Display name
	 */
	name: string;

	/**
	 * Brief description of the model
	 */
	description: string;

	/**
	 * Context window size
	 */
	context: number;

	/**
	 * Output token limit
	 */
	outputLimit: number;

	/**
	 * Pricing for input tokens
	 */
	inputCost: number;

	/**
	 * Pricing for output tokens
	 */
	outputCost: number;

	/**
	 * Key strengths of the model
	 */
	strengths: string;

	/**
	 * Supported prompt types
	 */
	supports: string[];
}

/**
 * Collection of models indexed by ID
 */
export type ModelDatabase = Record<string, ModelInfo>;
