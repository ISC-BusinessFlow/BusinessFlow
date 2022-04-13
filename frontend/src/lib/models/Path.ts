export type Path = {
  id: number;
  label?: string;
  pathTypeId: number;
  fromTaskId: number;
  toTaskId: number | null;
  flowId: number;
  createdAt: string;
  updatedAt: string;
};
