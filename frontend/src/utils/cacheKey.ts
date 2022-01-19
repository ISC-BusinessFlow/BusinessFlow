export const flowCacheKey = {
  getAll: ['flows'] as const,
  getById: (id: number) => [...flowCacheKey.getAll, 'detail', id] as const,
  getTasksById: (id: number) => [...flowCacheKey.getById(id), 'tasks'] as const,
  getActorsById: (id: number) =>
    [...flowCacheKey.getById(id), 'actors'] as const,
  getPathsById: (id: number) => [...flowCacheKey.getById(id), 'paths'] as const,
};
