type Opinion = {
  id?: number;
  userName: string;
  title: string;
  body: string;
  votes?: number;
};

type Data = {
  opinions: Opinion[];
};

export type { Opinion, Data };
