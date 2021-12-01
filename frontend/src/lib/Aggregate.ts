export interface Aggregate<T> {
  add: (item: T) => void;
  find: (id: number) => T | null;
}
