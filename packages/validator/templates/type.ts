export interface Error {
  print: () => void;
  getError: () => {
    message: string;
    level: string;
    relation: {
      from?: TaskObject;
      to?: TaskObject;
      path?: PathObject;
    };
  };
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
