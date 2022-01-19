import {
  BaseObject,
  PathRuleObject,
  RuleObject,
  RuleObjects,
  TaskRuleObject,
} from './object';
import { formatRuleObject } from './rule';

type Test = {
  input: {
    object: TaskRuleObject | PathRuleObject;
    rule: {
      tasks: TaskRuleObject[];
      paths: PathRuleObject[];
    };
  };

  expected: BaseObject &
    Required<RuleObjects<Required<RuleObject<BaseObject[]>>>>;
};

describe('formatRuleObject', () => {
  it('allowとdeny両方指定しないとき、allowが"*"になる', () => {
    const tasks = [
      {
        name: 'task1',
        id: 1,
      },
      {
        name: 'task2',
        id: 2,
      },
    ];

    const paths = [
      {
        name: 'path1',
        id: 1,
      },
      {
        name: 'path2',
        id: 2,
      },
    ];

    const test: Test = {
      input: {
        object: {
          ...tasks[0],
        },
        rule: {
          tasks,
          paths,
        },
      },
      expected: {
        ...tasks[0],
        from: {
          allowPaths: paths,
          allowTasks: tasks,
          denyPaths: [],
          denyTasks: [],
        },
        to: {
          allowPaths: paths,
          allowTasks: tasks,
          denyPaths: [],
          denyTasks: [],
        },
      },
    };

    const result = formatRuleObject(test.input.object, test.input.rule);
    expect(test.expected).toStrictEqual(result);
  });

  it('denyが指定されているとき、deny以外のobjectがallowになる', () => {
    const tasks = [
      {
        name: 'task1',
        id: 1,
      },
      {
        name: 'task2',
        id: 2,
      },
    ];

    const paths = [
      {
        name: 'path1',
        id: 1,
      },
      {
        name: 'path2',
        id: 2,
      },
    ];

    const test: Test = {
      input: {
        object: {
          ...tasks[0],
          from: {
            denyPaths: [paths[0].name],
            denyTasks: [tasks[0].name],
          },
          to: {
            denyPaths: [paths[0].name],
            denyTasks: [tasks[0].name],
          },
        },
        rule: {
          tasks,
          paths,
        },
      },
      expected: {
        ...tasks[0],
        from: {
          allowPaths: paths.filter((path) => path.id !== paths[0].id),
          allowTasks: tasks.filter((task) => task.id !== tasks[0].id),
          denyPaths: [paths[0]],
          denyTasks: [tasks[0]],
        },
        to: {
          allowPaths: paths.filter((path) => path.id !== paths[0].id),
          allowTasks: tasks.filter((task) => task.id !== tasks[0].id),
          denyPaths: [paths[0]],
          denyTasks: [tasks[0]],
        },
      },
    };

    const result = formatRuleObject(test.input.object, test.input.rule);
    expect(test.expected).toStrictEqual(result);
  });

  it('"*"が指定されているところは対象のobject全てに置き換わる', () => {
    const tasks = [
      {
        name: 'task1',
        id: 1,
      },
      {
        name: 'task2',
        id: 2,
      },
    ];

    const paths = [
      {
        name: 'path1',
        id: 1,
      },
      {
        name: 'path2',
        id: 2,
      },
    ];

    const test: Test = {
      input: {
        object: {
          ...tasks[0],
          from: {
            denyPaths: '*',
            denyTasks: '*',
          },
          to: {
            allowPaths: '*',
            allowTasks: '*',
          },
        },
        rule: {
          tasks,
          paths,
        },
      },
      expected: {
        ...tasks[0],
        from: {
          allowPaths: [],
          allowTasks: [],
          denyPaths: paths,
          denyTasks: tasks,
        },
        to: {
          allowPaths: paths,
          allowTasks: tasks,
          denyPaths: [],
          denyTasks: [],
        },
      },
    };

    const result = formatRuleObject(test.input.object, test.input.rule);
    expect(test.expected).toStrictEqual(result);
  });
});
