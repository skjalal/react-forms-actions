import type { PropsWithChildren } from "react";
import React, { useState, useEffect } from "react";
import type { Opinion, OpinionsContextProps } from "../util/data-types";
import { OpinionsContext } from "./opinions-context";

const OpinionsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions: Opinion[] = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  const addOpinion = async (enteredOpinionData: Opinion) => {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  };

  const upvoteOpinion = (id: number): void => {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          const votes = opinion.votes ? opinion.votes + 1 : 0;
          return { ...opinion, votes: votes };
        }
        return opinion;
      });
    });
  };

  const downvoteOpinion = (id: number): void => {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          const votes = opinion.votes ? opinion.votes - 1 : 0;
          return { ...opinion, votes: votes };
        }
        return opinion;
      });
    });
  };

  const contextValue: OpinionsContextProps = {
    opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
};

export default OpinionsContextProvider;
