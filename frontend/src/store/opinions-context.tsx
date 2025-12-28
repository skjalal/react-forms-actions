import { createContext, useContext } from "react";
import type { Opinion, OpinionsContextProps } from "../util/data-types.ts";

const defaultAddOpinion = async (opinion: Opinion): Promise<void> => {
  console.log("Default Add Opinion invoked: ", opinion);
};

const defaultUpvoteOpinion = async (id: number): Promise<void> => {
  console.log("Default UpvoteOpinion invoked: ", id);
};

const defaultDownvoteOpinion = async (id: number): Promise<void> => {
  console.log("Default DownvoteOpinion invoked: ", id);
};

export const OpinionsContext = createContext<OpinionsContextProps>({
  opinions: null,
  addOpinion: defaultAddOpinion,
  upvoteOpinion: defaultUpvoteOpinion,
  downvoteOpinion: defaultDownvoteOpinion,
});

export const useOpinion = () => {
  const context = useContext(OpinionsContext);
  if (!context) {
    throw new Error("useOpinion must be used within a OpinionsProvider");
  }
  return context;
};
