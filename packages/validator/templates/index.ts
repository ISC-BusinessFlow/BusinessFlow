/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PathRule, RelationRule, TaskRule } from './base';
// @ts-ignore
import * as paths from './paths';
// @ts-ignore
import * as tasks from './tasks';
import { Error, Result } from './type';

export function appendError(errors: Error[], result: Result) {
  if (!result.isValid) {
    errors.push(...result.errors);
  }
}

export function validateRelation({
  fromId,
  pathId,
  toId,
}: {
  fromId: number;
  pathId: number;
  toId: number;
}): Result {
  // @ts-ignore
  const fromTask: TaskRule = tasks[`task${fromId}`];
  // @ts-ignore
  const path: PathRule = paths[`path${pathId}`];
  // @ts-ignore
  const toTask: TaskRule = tasks[`task${toId}`];

  const errors: Error[] = [];

  appendError(errors, fromTask.validateNextTask(toId));
  appendError(errors, fromTask.validateNextPath(pathId));

  appendError(errors, path.validateNextTask(toId));
  appendError(errors, path.validatePreviousTask(fromId));

  appendError(errors, toTask.validatePreviousTask(fromId));
  appendError(errors, toTask.validatePreviousPath(pathId));

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getTaskRule(id: number): RelationRule {
  // @ts-ignore
  const task: TaskRule = tasks[`task${id}`];

  return task.getRule();
}

export function getPathRule(id: number): RelationRule {
  // @ts-ignore
  const path: PathRule = paths[`path${id}`];

  return path.getRule();
}
