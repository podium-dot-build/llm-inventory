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
	context: string;

	/**
	 * Pricing for input tokens
	 */
	inputPricing: number;

	/**
	 * Pricing for output tokens
	 */
	outputPricing: number;

	/**
	 * Key strengths of the model
	 */
	strengths: string;
}

/**
 * Collection of models indexed by ID
 */
export type ModelDatabase = Record<string, ModelInfo>;
