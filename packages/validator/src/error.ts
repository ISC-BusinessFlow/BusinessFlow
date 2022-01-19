import { PathRuleObject, RuleSet, TaskRuleObject } from './object';

export class Error {
  public message;
  public level;
  public at;

  constructor({
    message,
    level,
    at,
  }: {
    message: string;
    level: 'ERROR' | 'WARNING';
    at: TaskRuleObject | PathRuleObject;
  }) {
    this.message = message;
    this.level = level;
    this.at = at;
  }

  public print() {
    console.group(`${this.level}: ${this.message}`);
    console.log(this.at);
    console.groupEnd();
  }
}

function undefinedError(
  object: TaskRuleObject | PathRuleObject,
  undefinedKey: string
) {
  return new Error({
    message: `${undefinedKey}は定義されていません`,
    level: 'ERROR',
    at: object,
  });
}

function onlyAllowOrDenyError(object: TaskRuleObject | PathRuleObject) {
  return new Error({
    message: 'denyとallowは同時に定義することはできません',
    level: 'ERROR',
    at: object,
  });
}

export function checkRule({
  tasks,
  paths,
}: {
  tasks: TaskRuleObject[];
  paths: PathRuleObject[];
}): Error[] {
  const errors = [];
  const pathsError = paths.reduce(
    (pre: Error[], cur) => [
      ...pre,
      ...checkOnlyAllowOrDeny(cur),
      ...checkUndefinedKeys(
        (key) => !!tasks.find((path) => path.name === key),
        (key) => !!paths.find((path) => path.name === key),
        cur
      ),
    ],
    []
  );

  const tasksError = tasks.reduce(
    (pre: Error[], cur) => [
      ...pre,
      ...checkOnlyAllowOrDeny(cur),
      ...checkUndefinedKeys(
        (key) => !!tasks.find((path) => path.name === key),
        (key) => !!paths.find((path) => path.name === key),
        cur
      ),
    ],
    []
  );

  errors.push(...pathsError);
  errors.push(...tasksError);

  return errors;
}

export function checkOnlyAllowOrDeny(
  object: TaskRuleObject | PathRuleObject
): Error[] {
  const errors: Error[] = [];

  if (object.to?.denyTasks && object.to?.allowTasks) {
    errors.push(onlyAllowOrDenyError(object));
  }
  if (object.to?.denyPaths && object.to?.allowPaths) {
    errors.push(onlyAllowOrDenyError(object));
  }
  if (object.from?.denyTasks && object.from?.allowTasks) {
    errors.push(onlyAllowOrDenyError(object));
  }
  if (object.from?.denyPaths && object.from?.allowPaths) {
    errors.push(onlyAllowOrDenyError(object));
  }

  return errors;
}

function checkUndefinedKeys(
  findTaskKeyFn: (key: string) => boolean,
  findPathKeyFn: (key: string) => boolean,
  object: TaskRuleObject | PathRuleObject
) {
  const errors: Error[] = [];

  if (object.to?.denyPaths) {
    errors.push(
      ...checkUndefinedKey(findPathKeyFn, object, object.to.denyPaths)
    );
  }
  if (object.to?.denyTasks) {
    errors.push(
      ...checkUndefinedKey(findTaskKeyFn, object, object.to.denyTasks)
    );
  }
  if (object.from?.denyPaths) {
    errors.push(
      ...checkUndefinedKey(findPathKeyFn, object, object.from.denyPaths)
    );
  }
  if (object.from?.denyTasks) {
    errors.push(
      ...checkUndefinedKey(findTaskKeyFn, object, object.from.denyTasks)
    );
  }

  return errors;
}

function checkUndefinedKey(
  findKeyFn: (key: string) => boolean,
  object: TaskRuleObject | PathRuleObject,
  ruleSet: RuleSet
) {
  const errors: Error[] = [];
  if (ruleSet && ruleSet !== '*') {
    ruleSet.map((name) => {
      if (!findKeyFn(name)) {
        errors.push(undefinedError(object, name));
      }
    });
  }

  return errors;
}
