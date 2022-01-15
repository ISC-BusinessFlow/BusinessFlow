import {
  BaseObject,
  PathRuleObject,
  RuleObject,
  ruleObjectKey,
  RuleObjects,
  RuleSet,
  TaskRuleObject,
} from './object';

export function formatRuleObject(
  _object: TaskRuleObject | PathRuleObject,
  rule: {
    tasks: TaskRuleObject[];
    paths: PathRuleObject[];
  }
) {
  const object: BaseObject &
    Required<RuleObjects<Required<RuleObject<BaseObject[]>>>> = {
    id: _object.id,
    name: _object.name,
    from: {
      allowPaths: [],
      allowTasks: [],
      denyPaths: [],
      denyTasks: [],
    },
    to: {
      allowPaths: [],
      allowTasks: [],
      denyPaths: [],
      denyTasks: [],
    },
  };

  ruleObjectKey.forEach((key) => {
    const target = {
      ..._object[key],
    };

    if (!(target && target.denyPaths && target.denyPaths.length)) {
      target.allowPaths = '*';
    }

    if (!(target && target.denyTasks && target.denyTasks.length)) {
      target.allowTasks = '*';
    }

    target.allowPaths = replaceSymbol(target?.allowPaths, rule.paths);
    target.denyPaths = replaceSymbol(target?.denyPaths, rule.paths);
    target.allowTasks = replaceSymbol(target?.allowTasks, rule.tasks);
    target.denyTasks = replaceSymbol(target?.denyTasks, rule.tasks);

    target.allowPaths = fillRuleSet(
      target?.allowPaths,
      target?.denyPaths,
      rule.paths
    );
    target.denyPaths = fillRuleSet(
      target?.denyPaths,
      target?.allowPaths,
      rule.paths
    );
    target.allowTasks = fillRuleSet(
      target?.allowTasks,
      target?.denyTasks,
      rule.tasks
    );
    target.denyTasks = fillRuleSet(
      target?.denyTasks,
      target?.allowTasks,
      rule.tasks
    );

    object[key].allowPaths = convertToBaseObject(target.allowPaths, rule.paths);
    object[key].denyPaths = convertToBaseObject(target.denyPaths, rule.paths);
    object[key].allowTasks = convertToBaseObject(target.allowTasks, rule.tasks);
    object[key].denyTasks = convertToBaseObject(target.denyTasks, rule.tasks);
  });

  return object;
}

function fillRuleSet(
  target: RuleSet | undefined,
  opposite: RuleSet | undefined,
  allRuleObject: TaskRuleObject[] | PathRuleObject[]
) {
  if (target === '*') return [];
  if (target) return target;
  if (!opposite || !opposite.length) return [];

  return allRuleObject
    .map((object) => {
      if (opposite.includes(object.name)) return;
      return object.name;
    })
    .filter((key): key is string => typeof key == 'string');
}

function replaceSymbol(
  target: RuleSet | undefined,
  allRuleObject: TaskRuleObject[] | PathRuleObject[]
) {
  if (target !== '*') return target;

  return allRuleObject.map((item) => item.name);
}

function convertToBaseObject(
  ruleSet: string[] | undefined,
  allRuleObject: TaskRuleObject[] | PathRuleObject[]
) {
  if (!ruleSet) return [];
  return allRuleObject
    .filter((item) => ruleSet?.includes(item.name))
    .map((item) => ({
      name: item.name,
      id: item.id,
    }));
}
