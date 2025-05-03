/**
 * Calculate per-token pricing from dollars per million tokens
 * Returns the exact per-token price as a number
 */
export const calculatePerTokenPrice = (dollarsPerMillion: number): number => {
	return dollarsPerMillion / 1000000;
};
