import type { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";

// Read allowed origins from env for flexibility (comma-separated)
const allowed = (process.env["ALLOWED_ORIGINS"] ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// In dev, fall back to common React dev servers if ALLOWED_ORIGINS is empty
const devFallback = ["http://localhost:5173", "http://127.0.0.1:5173"];

const whitelist = allowed.length ? allowed : devFallback;

/**
 * Dynamic origin check.
 * - Returns the requesting origin if it's in the whitelist.
 * - Allows non-browser requests (no Origin header) such as server-to-server or CLI tools.
 */
const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow tools like curl/Postman
    const isAllowed = whitelist.includes(origin);
    cb(isAllowed ? null : new Error("Not allowed by CORS"), isAllowed);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // set to true only if you actually need cookies/Authorization across origins
  optionsSuccessStatus: 204,
};

export const corsMiddleware = cors(corsOptions);

/**
 * Optional: add Vary: Origin when returning a specific ACAO for better caching behavior.
 * See MDN guidance. [3](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin)
 */
export function addVaryOrigin(req: Request, res: Response, next: NextFunction) {
  res.header("Vary", "Origin");
  next();
}
