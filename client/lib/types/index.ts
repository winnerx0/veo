export declare type Poll = {
  id: string;
  title: string;
  ending: number[];
  options: Option[];
  user: string;
};

export declare type Option = {
  id: string;
  name: string;
  votes: string[];
};

export declare type Vote = {
  id: string
  userid: string
  option: Pick<Option, "id" | "name">
}

export declare type User = {
  id: string
  username: string
  password: string
  email: string
}