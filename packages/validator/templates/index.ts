/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PathRule, TaskRule } from './base';
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
  const fromTask: TaskRule = tasks[`task${fromId}`];
  const path: PathRule = paths[`path${pathId}`];
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

export function getTaskRule(id: number) {
  const task = tasks[`task${id}`];

  return task.getRule();
}

export function getPathRule(id: number) {
  const path = paths[`path${id}`];

  return path.getRule();
}
