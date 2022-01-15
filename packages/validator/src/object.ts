export type RuleSymbol = '*';

export type RuleSet = string[] | RuleSymbol;

export type RuleObject<T = RuleSet> = {
  allowTasks?: T;
  allowPaths?: T;
  denyTasks?: T;
  denyPaths?: T;
};

export const ruleObjectKey = ['from', 'to'] as const;

export type BaseObject = {
  name: string;
  id: number;
};

export type RuleObjects<T = RuleObject> = {
  [key in typeof ruleObjectKey[number]]?: T;
};

export type TaskRuleObject = BaseObject & RuleObjects;
export type PathRuleObject = BaseObject & RuleObjects;
