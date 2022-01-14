import {
  PathRuleObject,
  PathRuleSet,
  ruleObjectKey,
  TaskRuleObject,
  TaskRuleSet,
} from './object';

function fillRuleSet(
  target: TaskRuleSet | PathRuleSet | undefined,
  opposite: TaskRuleSet | PathRuleSet | undefined,
  allRuleObject: TaskRuleObject[] | PathRuleObject[]
) {
  if (target) return target;

  if (!opposite || opposite.length === 0) {
    return '*';
  }

  return allRuleObject
    .map((object) => {
      if (opposite.includes(object.name)) return;
      return object.name;
    })
    .filter((key): key is string => typeof key == 'string');
}

function replaceSymbol(
  target: TaskRuleSet | PathRuleSet | undefined,
  allRuleObject: TaskRuleObject[] | PathRuleObject[]
) {
  if (!target) return target;
  if (target !== '*') return target;

  return allRuleObject.map((item) => item.name);
}

export function formatRuleObject(
  object: TaskRuleObject | PathRuleObject,
  rule: {
    tasks: TaskRuleObject[];
    paths: PathRuleObject[];
  }
) {
  ruleObjectKey.forEach((key) => {
    const target = object[key];

    if (!object[key]) {
      object[key] = {};
    }

    if (!(target && target.denyPaths && target.denyPaths.length)) {
      object[key] = {
        ...object[key],
        allowPaths: rule.paths.map((path) => path.name),
      };
    }

    if (!(target && target.denyTasks && target.denyTasks.length)) {
      object[key] = {
        ...object[key],
        allowTasks: rule.tasks.map((task) => task.name),
      };
    }

    object[key] = {
      ...object[key],
      allowPaths: replaceSymbol(object[key]?.allowPaths, rule.paths),
      denyPaths: replaceSymbol(object[key]?.denyPaths, rule.paths),
      allowTasks: replaceSymbol(object[key]?.allowTasks, rule.tasks),
      denyTasks: replaceSymbol(object[key]?.denyTasks, rule.tasks),
    };

    const allowPaths = fillRuleSet(
      object[key]?.allowPaths,
      object[key]?.denyPaths,
      rule.paths
    );
    const denyPaths = fillRuleSet(
      object[key]?.denyPaths,
      object[key]?.allowPaths,
      rule.paths
    );
    const allowTasks = fillRuleSet(
      object[key]?.allowTasks,
      object[key]?.denyTasks,
      rule.tasks
    );
    const denyTasks = fillRuleSet(
      object[key]?.denyTasks,
      object[key]?.allowTasks,
      rule.tasks
    );

    object[key] = {
      ...object[key],
      allowPaths,
      denyPaths,
      allowTasks,
      denyTasks,
    };
  });

  return object;
}
