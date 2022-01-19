import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

type Obj = { [key: string]: any };

export const modifyCase = (
  obj: Obj,
  modifyCaseFn: (str?: string) => string
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => modifyCase(item, modifyCaseFn));
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  return Object.keys(obj).reduce(
    (pre, cur) => ({
      ...pre,
      [modifyCaseFn(cur)]: modifyCase(obj[cur], modifyCaseFn),
    }),
    {}
  );
};

export const toCamelCase = (obj: Obj) => modifyCase(obj, camelCase);
export const toSnakeCase = (obj: Obj) => modifyCase(obj, snakeCase);
