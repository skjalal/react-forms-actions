// src/lib/error-handler.ts
import type { ErrorRequestHandler } from "express";

// Shape we care about in errors we emit
type WithStatusMessage = {
  status?: number;
  message?: string;
};

// Type guard: proves the runtime shape safely
function isWithStatusMessage(err: unknown): err is WithStatusMessage {
  return (
    typeof err === "object" &&
    err !== null &&
    // Use `in` checks guarded for objects
    ("status" in err || "message" in err)
  );
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status =
    isWithStatusMessage(err) && typeof err.status === "number"
      ? err.status
      : 500;

  const message =
    isWithStatusMessage(err) && typeof err.message === "string"
      ? err.message
      : "Internal Server Error";

  res.status(status).json({ error: message });
};
