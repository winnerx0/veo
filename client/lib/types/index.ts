export declare type Poll = {
  id: string;
  title: string;
  ending: number[];
  options: Option[];
  user: {
    email: string
  };
};

export declare type Option = {
  id: string;
  name: string;
  votes: string[];
};

export declare type User = {
  id: string
  username: string
  password: string
  email: string
}