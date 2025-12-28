type Opinion = {
  id?: number;
  title: string;
  userName: string;
  body: string;
  votes?: number;
};

type OpinionProps = {
  opinion: Opinion;
};

type OpinionsContextProps = {
  opinions: Opinion[] | null;
  addOpinion: (opinion: Opinion) => Promise<void>;
  upvoteOpinion: (id: number) => Promise<void>;
  downvoteOpinion: (id: number) => Promise<void>;
};

type FormState = {
  errors: string[];
  enteredValues?: FormValue;
};

type FormValue = {
  id?: number;
  votes?: number;
  userName: string;
  title: string;
  body: string;
};

export type {
  OpinionProps,
  Opinion,
  OpinionsContextProps,
  FormState,
  FormValue,
};
