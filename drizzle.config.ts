import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
});
