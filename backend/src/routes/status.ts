import type { Request, Response } from "express";

export const statusHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const pkg = await import("../../package.json", { with: { type: "json" } });
  res.status(200).json({
    name: pkg.default.name,
    version: pkg.default.version,
    env: process.env["NODE_ENV"] ?? "development",
  });
};
