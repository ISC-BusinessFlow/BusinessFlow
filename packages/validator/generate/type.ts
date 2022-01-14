export interface Error {
  print: () => void;
}

export type Result = {
  isValid: boolean;
  errors: Error[];
};

export type TaskObject = {
  name: string;
  id: number;
};

export type PathObject = {
  name: string;
  id: number;
};
