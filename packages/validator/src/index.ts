import ejs from 'ejs';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { checkRule } from './error';
import { PathRuleObject, TaskRuleObject } from './object';
import { formatRuleObject } from './rule';

const APP_DIR = path.resolve(__dirname);
const GENERATE_DIR = path.posix.join(APP_DIR, '../generate');
const TEMPLATE_DIR = path.posix.join(APP_DIR, '../templates');

function loadConfigFile() {
  const filePath = path.posix.join(APP_DIR, '../rule.yml');

  console.log(`Loading config yaml file at ${filePath}`);
  try {
    const rule = yaml.load(fs.readFileSync(filePath, 'utf8'));
    return rule as {
      tasks: TaskRuleObject[];
      paths: PathRuleObject[];
    };
  } catch (e) {
    console.log();
    console.error(e);
    return null;
  }
}

function main() {
  const rule = loadConfigFile();
  if (!rule) return;

  const errors = checkRule(rule);

  if (errors.length) {
    errors
      .sort((a, b) => a.level.localeCompare(b.level))
      .forEach((error) => {
        error.print();
      });
    return;
  }

  if (!fs.existsSync(GENERATE_DIR)) {
    fs.mkdirSync(GENERATE_DIR);
    fs.mkdirSync(path.posix.join(GENERATE_DIR, 'tasks'));
    fs.mkdirSync(path.posix.join(GENERATE_DIR, 'paths'));
  }

  fs.copyFileSync(
    path.posix.join(TEMPLATE_DIR, 'index.ts'),
    path.posix.join(GENERATE_DIR, 'index.ts')
  );
  fs.copyFileSync(
    path.posix.join(TEMPLATE_DIR, 'base.ts'),
    path.posix.join(GENERATE_DIR, 'base.ts')
  );
  fs.copyFileSync(
    path.posix.join(TEMPLATE_DIR, 'type.ts'),
    path.posix.join(GENERATE_DIR, 'type.ts')
  );

  const formattedTasks = rule.tasks.map((task) => formatRuleObject(task, rule));
  const formattedPaths = rule.paths.map((path) => formatRuleObject(path, rule));

  formattedTasks.forEach((item) => {
    ejs.renderFile(
      path.posix.join(TEMPLATE_DIR, 'tasks/template.ejs'),
      item,
      (error, out) => {
        if (error) {
          console.error(error);
          return;
        }

        fs.writeFileSync(
          path.posix.join(GENERATE_DIR, `tasks/task${item.id}.ts`),
          out
        );
      }
    );
  });
  ejs.renderFile(
    path.posix.join(TEMPLATE_DIR, 'tasks/index.ejs'),
    {
      taskIds: rule.tasks.map((item) => item.id),
    },
    (error, out) => {
      if (error) {
        console.error(error);
        return;
      }

      fs.writeFileSync(path.posix.join(GENERATE_DIR, `tasks/index.ts`), out);
    }
  );

  formattedPaths.forEach((item) => {
    ejs.renderFile(
      path.posix.join(TEMPLATE_DIR, 'paths/template.ejs'),
      item,
      (error, out) => {
        if (error) {
          console.error(error);
          return;
        }

        fs.writeFileSync(
          path.posix.join(GENERATE_DIR, `paths/path${item.id}.ts`),
          out
        );
      }
    );
  });
  ejs.renderFile(
    path.posix.join(TEMPLATE_DIR, 'paths/index.ejs'),
    {
      pathIds: rule.paths.map((item) => item.id),
    },
    (error, out) => {
      if (error) {
        console.error(error);
        return;
      }

      fs.writeFileSync(path.posix.join(GENERATE_DIR, `paths/index.ts`), out);
    }
  );
}

main();
