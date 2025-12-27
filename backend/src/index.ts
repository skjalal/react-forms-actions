import { Request, Response } from "express";
import { config } from "./config/env.js";
import { buildApp } from "./lib/server.js";
import { errorHandler } from "./lib/error-handler.js";
import { healthHandler } from "./routes/health.js";
import { statusHandler } from "./routes/status.js";
import {
  loadOpinions,
  saveOpinion,
  upvoteOpinion,
  downvoteOpinion,
} from "./routes/opinion.js";

const app = buildApp();

app.get("/healthz", healthHandler);
app.get("/api/v1/status", statusHandler);

app.get("/opinions", async (_req: Request, res: Response) => {
  try {
    const opinions = await loadOpinions();
    res.json(opinions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error loading opinions." });
  }
});

app.post("/opinions", async (req: Request, res: Response) => {
  const { userName, title, body } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!userName || !title || !body) {
    return res
      .status(400)
      .json({ error: "User name, title and opinion body are required." });
  }
  try {
    const newOpinion = await saveOpinion({ userName, title, body });
    res.status(201).json(newOpinion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving opinion." });
  }
});

app.post("/opinions/:id/upvote", async (req: Request, res: Response) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await upvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }
    res.json(opinion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error upvoting opinion." });
  }
});

app.post("/opinions/:id/downvote", async (req: Request, res: Response) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await downvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }
    res.json(opinion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error downvoting opinion." });
  }
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.info(`Express server listening on port ${config.PORT}`);
});
