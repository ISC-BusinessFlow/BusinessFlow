import { toCamelCase, toSnakeCase } from './modifyCase';

describe('modifyCase', () => {
  it('valueがstring, number, booleanのobjectを変換する', () => {
    const test = {
      camel: {
        stringKey: 'value',
        numberKey: 1,
        booleanKey: true,
      },
      snake: {
        string_key: 'value',
        number_key: 1,
        boolean_key: true,
      },
    };

    const toSnake = toSnakeCase(test.camel);
    expect(test.snake).toStrictEqual(toSnake);

    const toCamel = toCamelCase(test.snake);
    expect(test.camel).toStrictEqual(toCamel);
  });

  it('valueがarrayのobjectを変換する', () => {
    const test = {
      camel: {
        arrayStringKey: ['value', 'value'],
        arrayNumberKey: [1, 2],
        arrayBooleanKey: [true, false],
        arrayObjectKey: [
          {
            stringKey: 'value',
            numberKey: 1,
            booleanKey: true,
          },
        ],
      },
      snake: {
        array_string_key: ['value', 'value'],
        array_number_key: [1, 2],
        array_boolean_key: [true, false],
        array_object_key: [
          {
            string_key: 'value',
            number_key: 1,
            boolean_key: true,
          },
        ],
      },
    };

    const toSnake = toSnakeCase(test.camel);
    expect(test.snake).toStrictEqual(toSnake);

    const toCamel = toCamelCase(test.snake);
    expect(test.camel).toStrictEqual(toCamel);
  });

  it('valueがobjectのobjectを変換する', () => {
    const test = {
      camel: {
        objectKey: {
          stringKey: 'value',
          numberKey: 1,
          booleanKey: true,
        },
      },
      snake: {
        object_key: {
          string_key: 'value',
          number_key: 1,
          boolean_key: true,
        },
      },
    };

    const toSnake = toSnakeCase(test.camel);
    expect(test.snake).toStrictEqual(toSnake);

    const toCamel = toCamelCase(test.snake);
    expect(test.camel).toStrictEqual(toCamel);
  });
});
