import type { ModelDatabase, ModelInfo } from "@/types";
import { calculatePerTokenPrice } from "@/utils/calculatePerTokenPrice";

/**
 * Database of AI models information
 */
export const modelInfo: ModelDatabase = {
	"claude-3-haiku": {
		id: "claude-3-haiku",
		name: "Claude 3 Haiku",
		description: "Fastest and most compact model for near-instant responsiveness",
		context: 200000,
		inputCost: calculatePerTokenPrice(0.25),
		outputCost: calculatePerTokenPrice(1.25),
		strengths: "Quick and accurate targeted performance",
	},
	"claude-3-sonnet": {
		id: "claude-3-sonnet",
		name: "Claude 3 Sonnet",
		description: "Best combination of intelligence and speed",
		context: 200000,
		inputCost: calculatePerTokenPrice(3),
		outputCost: calculatePerTokenPrice(15),
		strengths: "High level of intelligence and capability",
	},
	"claude-3-opus": {
		id: "claude-3-opus",
		name: "Claude 3 Opus",
		description: "Powerful model for complex tasks",
		context: 200000,
		inputCost: calculatePerTokenPrice(15),
		outputCost: calculatePerTokenPrice(75),
		strengths: "Top-level intelligence, fluency, and understanding",
	},
	"claude-3-5-sonnet": {
		id: "claude-3-5-sonnet",
		name: "Claude 3.5 Sonnet",
		description: "Powerful, intelligent model with good speed",
		context: 200000,
		inputCost: calculatePerTokenPrice(3),
		outputCost: calculatePerTokenPrice(15),
		strengths: "High level of intelligence and capability",
	},
	"claude-3-5-haiku": {
		id: "claude-3-5-haiku",
		name: "Claude 3.5 Haiku",
		description: "Our fastest model",
		context: 200000,
		inputCost: calculatePerTokenPrice(0.8),
		outputCost: calculatePerTokenPrice(4),
		strengths: "Intelligence at blazing speeds",
	},
	"claude-3-7-sonnet": {
		id: "claude-3-7-sonnet",
		name: "Claude 3.7 Sonnet",
		description: "Our most intelligent model",
		context: 200000,
		inputCost: calculatePerTokenPrice(3),
		outputCost: calculatePerTokenPrice(15),
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
