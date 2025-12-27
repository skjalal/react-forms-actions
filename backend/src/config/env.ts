import { loadEnvFile } from "node:process";

try {
  loadEnvFile();
} catch {
  /* optional .env in prod */
}

export interface AppConfig {
  readonly NODE_ENV: "development" | "test" | "production";
  readonly PORT: number;
}

const toInt = (v: string | undefined, fallback: number): number => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export const config: AppConfig = {
  NODE_ENV: (process.env["NODE_ENV"] as AppConfig["NODE_ENV"]) ?? "development",
  PORT: toInt(process.env["PORT"], 3000),
};
