import path from "node:path";
import express, { Application, Response } from "express";

export function buildApp(): Application {
  const app = express();

  app.use(
    express.static(path.join(process.cwd(), "src", "images"), {
      maxAge: "1d", // cache hint
      index: false,
    })
  );

  // CORS

  app.use((_req, res: Response, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  // Body parsing
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  return app;
}
