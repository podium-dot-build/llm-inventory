export type TextModalityExtensions = "txt" | "html" | "md";
export type ImageModalityExtensions =
	| "png"
	| "jpg"
	| "jpeg"
	| "gif"
	| "webp"
	| "svg"
	| "heic"
	| "heif";
export type AudioModalityExtensions = "mp3" | "wav" | "m4a" | "ogg" | "flac";
export type VideoModalityExtensions = "mp4" | "webm" | "mov" | "avi" | "mkv";
export type FileModalityExtensions =
	| "pdf"
	| "doc"
	| "docx"
	| "xls"
	| "xlsx"
	| "ppt"
	| "pptx";

export type ModalExtensionType =
	| TextModalityExtensions
	| ImageModalityExtensions
	| AudioModalityExtensions
	| VideoModalityExtensions
	| FileModalityExtensions;

export type ModalityType = {
	type: "text" | "image" | "audio" | "video" | "file";
	extensions: ModalExtensionType[];
};

/**
 * Represents information about an AI model
 */
export type ModelInfo = {
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
	input: ModalityType[];

	/**
	 * Supported output types
	 */
	output: ModalityType[];

	/**
	 * Supported system prompt types
	 */
	systemPrompt: boolean;
};

/**
 * Collection of models indexed by ID
 */
export type ModelDatabase = Record<string, ModelInfo>;
