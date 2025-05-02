import app from "@/app";

const port = 3000;

// Start the Bun server with the correct event handling
const server = Bun.serve({
	fetch: app.fetch,
	port: port,
	development: process.env.NODE_ENV !== "production",
});

console.log(`Server is running on http://${server.hostname}:${server.port}`);

// Define the type for model information
interface ModelInfo {
	id: string;
	name: string;
	description: string;
	context: string;
	inputPricing: string;
	outputPricing: string;
	//uptime: string;
	strengths: string;
}

// Define the type for the model database
type ModelDatabase = {
	[key: string]: ModelInfo;
};

// Convert dollars to cents
const formatCents = (dollars: number): string => {
	return `${Math.round(dollars * 100)}¢/MTok`;
};

// Database of AI models information
const modelInfo: ModelDatabase = {
	"claude-3-haiku": {
		id: "claude-3-haiku",
		name: "Claude 3 Haiku",
		description: "Fastest and most compact model for near-instant responsiveness",
		context: "200K tokens",
		inputPricing: formatCents(0.25), // $0.25 -> 25¢
		outputPricing: formatCents(1.25), // $1.25 -> 125¢
		//uptime: "99.9%",
		strengths: "Quick and accurate targeted performance",
	},
	"claude-3-sonnet": {
		id: "claude-3-sonnet",
		name: "Claude 3 Sonnet",
		description: "Best combination of intelligence and speed",
		context: "200K tokens",
		inputPricing: formatCents(3), // $3 -> 300¢
		outputPricing: formatCents(15), // $15 -> 1500¢
		//uptime: "99.9%",
		strengths: "High level of intelligence and capability",
	},
	"claude-3-opus": {
		id: "claude-3-opus",
		name: "Claude 3 Opus",
		description: "Powerful model for complex tasks",
		context: "200K tokens",
		inputPricing: formatCents(15), // $15 -> 1500¢
		outputPricing: formatCents(75), // $75 -> 7500¢
		//uptime: "99.8%",
		strengths: "Top-level intelligence, fluency, and understanding",
	},
	"claude-3-5-sonnet": {
		id: "claude-3-5-sonnet",
		name: "Claude 3.5 Sonnet",
		description: "Powerful, intelligent model with good speed",
		context: "200K tokens",
		inputPricing: formatCents(3), // $3 -> 300¢
		outputPricing: formatCents(15), // $15 -> 1500¢
		//uptime: "99.9%",
		strengths: "High level of intelligence and capability",
	},
	"claude-3-5-haiku": {
		id: "claude-3-5-haiku",
		name: "Claude 3.5 Haiku",
		description: "Our fastest model",
		context: "200K tokens",
		inputPricing: formatCents(0.8), // $0.80 -> 80¢
		outputPricing: formatCents(4), // $4 -> 400¢
		//uptime: "99.95%",
		strengths: "Intelligence at blazing speeds",
	},
	"claude-3-7-sonnet": {
		id: "claude-3-7-sonnet",
		name: "Claude 3.7 Sonnet",
		description: "Our most intelligent model",
		context: "200K tokens",
		inputPricing: formatCents(3), // $3 -> 300¢
		outputPricing: formatCents(15), // $15 -> 1500¢
		//uptime: "99.8%",
		strengths:
			"Highest level of intelligence and capability with toggleable extended thinking",
	},
};

// Endpoint for AI model information
app.get("/model/:modelName", (c) => {
	const modelName = c.req.param("modelName");

	if (modelName in modelInfo) {
		return c.json(modelInfo[modelName]);
	}

	return c.json({ error: "Model not found" }, 404);
});

// Endpoint to list all available models
app.get("/models", (c) => {
	return c.json(Object.keys(modelInfo));
});
