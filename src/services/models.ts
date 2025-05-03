import type { ModelDatabase, ModelInfo } from "@/types/models";

/**
 * Calculate per-token pricing from dollars per million tokens
 * Returns the exact per-token price as a number
 */
export const calculatePerTokenPrice = (dollarsPerMillion: number): number => {
	return dollarsPerMillion / 1000000;
};

/**
 * Database of AI models information
 */
export const modelInfo: ModelDatabase = {
	"claude-3-haiku": {
		id: "claude-3-haiku",
		name: "Claude 3 Haiku",
		description: "Fastest and most compact model for near-instant responsiveness",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(0.25),
		outputPricing: calculatePerTokenPrice(1.25),
		strengths: "Quick and accurate targeted performance",
	},
	"claude-3-sonnet": {
		id: "claude-3-sonnet",
		name: "Claude 3 Sonnet",
		description: "Best combination of intelligence and speed",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(3),
		outputPricing: calculatePerTokenPrice(15),
		strengths: "High level of intelligence and capability",
	},
	"claude-3-opus": {
		id: "claude-3-opus",
		name: "Claude 3 Opus",
		description: "Powerful model for complex tasks",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(15),
		outputPricing: calculatePerTokenPrice(75),
		strengths: "Top-level intelligence, fluency, and understanding",
	},
	"claude-3-5-sonnet": {
		id: "claude-3-5-sonnet",
		name: "Claude 3.5 Sonnet",
		description: "Powerful, intelligent model with good speed",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(3),
		outputPricing: calculatePerTokenPrice(15),
		strengths: "High level of intelligence and capability",
	},
	"claude-3-5-haiku": {
		id: "claude-3-5-haiku",
		name: "Claude 3.5 Haiku",
		description: "Our fastest model",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(0.8),
		outputPricing: calculatePerTokenPrice(4),
		strengths: "Intelligence at blazing speeds",
	},
	"claude-3-7-sonnet": {
		id: "claude-3-7-sonnet",
		name: "Claude 3.7 Sonnet",
		description: "Our most intelligent model",
		context: "200K tokens",
		inputPricing: calculatePerTokenPrice(3),
		outputPricing: calculatePerTokenPrice(15),
		strengths:
			"Highest level of intelligence and capability with toggleable extended thinking",
	},
};

/**
 * Get a model by ID
 */
export const getModelById = (id: string): ModelInfo | null => {
	return id in modelInfo ? modelInfo[id] : null;
};

/**
 * Get a list of all model IDs
 */
export const getAllModelIds = (): string[] => {
	return Object.keys(modelInfo);
};
