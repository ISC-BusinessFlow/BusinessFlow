export type Task = {
  id: number;
  name: string;
  label?: string;
  x: number;
  y: number;
  typeId: number;
  flowId: number;
  actorId: number;
  createdAt: string;
  updatedAt: string;
};
