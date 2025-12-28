import { promises as fs } from "node:fs";
import path from "node:path";
import type { Opinion, Data } from "../util/data-types.js";

const DATA_FILE = "db.json";

export async function loadOpinions(): Promise<Opinion[]> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
    const raw = await fs.readFile(filePath, "utf-8");
    const json: Data = JSON.parse(raw);
    return json.opinions;
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}

export async function saveOpinion(opinion: Opinion): Promise<Opinion> {
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  const opinions: Opinion[] = await loadOpinions();
  const newOpinion: Opinion = { ...opinion, id: Date.now(), votes: 0 };
  opinions.unshift(newOpinion);
  const dataToSave = { opinions };
  await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
  return newOpinion;
}

export async function upvoteOpinion(id: number): Promise<Opinion | null> {
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes = (opinion.votes ? opinion.votes : 0) + 1;
  await fs.writeFile(filePath, JSON.stringify({ opinions }, null, 2));
  return opinion;
}

export async function downvoteOpinion(id: number): Promise<Opinion | null> {
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes = (opinion.votes ? opinion.votes : 0) - 1;
  await fs.writeFile(filePath, JSON.stringify({ opinions }, null, 2));
  return opinion;
}
