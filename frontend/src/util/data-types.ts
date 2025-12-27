type Opinion = {
  id: number;
  title: string;
  userName: string;
  body: string;
  votes: number;
};

type OpinionProps = {
  opinion: Opinion;
};

type OpinionsContextProps = {
  opinions: Opinion[] | null;
  addOpinion: (opinion: Opinion) => Promise<void>;
  upvoteOpinion: (id: number) => void;
  downvoteOpinion: (id: number) => void;
};

export type { OpinionProps, Opinion, OpinionsContextProps };
