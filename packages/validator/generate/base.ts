import { Error as IError, PathObject, Result, TaskObject } from './type';

export class Error implements IError {
  public from?: TaskObject;
  public path?: PathObject;
  public to?: TaskObject;

  public message: string;
  public level: 'WARNING' | 'ERROR';

  constructor({
    from,
    path,
    to,
    message,
    level,
  }: {
    from?: TaskObject;
    path?: PathObject;
    to?: TaskObject;
    message: string;
    level: 'WARNING' | 'ERROR';
  }) {
    this.from = from;
    this.path = path;
    this.to = to;
    this.message = message;
    this.level = level;
  }

  public print() {
    console.group(`${this.level}: ${this.message}`);
    console.log({ from: this.from });
    console.log({ path: this.path });
    console.log({ to: this.to });
    console.groupEnd();
  }
}

type Rule = {
  allowTasks: TaskObject[];
  allowPaths: PathObject[];
  denyTasks: TaskObject[];
  denyPaths: PathObject[];
};

abstract class BaseRule {
  private id: number;
  private name: string;

  private from: Rule;
  private to: Rule;

  constructor({
    name,
    id,
    from,
    to,
  }: TaskObject & {
    from: Rule;
    to: Rule;
  }) {
    this.name = name;
    this.id = id;
    this.from = from;
    this.to = to;
  }

  public getRule() {
    return {
      from: this.from,
      to: this.to,
    };
  }

  public validateNextTask(id: number): Result {
    const errors = [];
    const denyTask = this.to.denyTasks.find((item) => item.id === id);
    if (denyTask) {
      errors.push(
        new Error({
          from: { name: this.name, id: this.id },
          to: denyTask,
          message: `${this.name}の次に${denyTask.name}が来ることはできません。`,
          level: 'ERROR',
        })
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public validatePreviousTask(id: number): Result {
    const errors = [];
    const denyTask = this.from.denyTasks.find((item) => item.id === id);
    if (denyTask) {
      errors.push(
        new Error({
          from: { name: this.name, id: this.id },
          to: denyTask,
          message: `${this.name}の前に${denyTask.name}が来ることはできません。`,
          level: 'ERROR',
        })
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public validateNextPath(id: number): Result {
    const errors = [];
    const denyPath = this.to.denyPaths.find((item) => item.id === id);
    if (denyPath) {
      errors.push(
        new Error({
          from: { name: this.name, id: this.id },
          to: denyPath,
          message: `${this.name}の前に${denyPath.name}が来ることはできません。`,
          level: 'ERROR',
        })
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  public validatePreviousPath(id: number): Result {
    const errors = [];
    const denyPath = this.from.denyPaths.find((item) => item.id === id);
    if (denyPath) {
      errors.push(
        new Error({
          from: { name: this.name, id: this.id },
          to: denyPath,
          message: `${this.name}の前に${denyPath.name}が来ることはできません。`,
          level: 'ERROR',
        })
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export class TaskRule extends BaseRule {}
export class PathRule extends BaseRule {}
