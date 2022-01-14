export type RuleSymbol = '*';

export type TaskRuleSet = string[] | RuleSymbol;
export type PathRuleSet = string[] | RuleSymbol;

export type RuleObject = {
  allowTasks?: TaskRuleSet;
  allowPaths?: PathRuleSet;
  denyTasks?: TaskRuleSet;
  denyPaths?: PathRuleSet;
};

export const ruleObjectKey = ['from', 'to'] as const;

export type TaskRuleObject = {
  name: string;
  id: string;
} & {
  [key in typeof ruleObjectKey[number]]?: RuleObject;
};

export type PathRuleObject = {
  name: string;
  id: string;
} & {
  [key in typeof ruleObjectKey[number]]?: RuleObject;
};
