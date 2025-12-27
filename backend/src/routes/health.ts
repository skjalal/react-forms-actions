import type { Request, Response } from "express";

export const healthHandler = (_req: Request, res: Response): void => {
  res.status(200).json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
