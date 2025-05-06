import { Database } from "bun:sqlite";

// Initialize the SQLite database file
const db = new Database("./models.db");

// Create the model_info table if it doesn't exist with all fields from ModelInfo
db.run(`
  CREATE TABLE IF NOT EXISTS model_info (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    strengths TEXT,
    context INTEGER NOT NULL,
    outputLimit INTEGER NOT NULL,
    inputCost REAL NOT NULL,
    outputCost REAL NOT NULL,
    systemPrompt INTEGER NOT NULL,
    input JSON NOT NULL,
    output JSON NOT NULL
  );
`);

export default db;
