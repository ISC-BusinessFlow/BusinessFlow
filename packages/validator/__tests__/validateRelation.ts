import { validateRelation } from '../generate';

const generateNextErrorMessage = (from: string, to: string) => {
  return `${from}の次に${to}が来ることはできません。`;
};

const generatePreviousErrorMessage = (from: string, to: string) => {
  return `${from}の前に${to}が来ることはできません。`;
};

describe('validateRelation', () => {
  it('トリガの次に入出力が来たとき、エラーは発生しない', () => {
    const test = {
      input: {
        fromId: 1,
        pathId: 1,
        toId: 2,
      },
      expected: {
        isValid: true,
        errors: [],
      },
    };

    const result = validateRelation(test.input);

    expect(test.expected).toStrictEqual(result);
  });

  it('トリガの次にトリガが来たとき、エラーが発生する', () => {
    const test = {
      input: {
        fromId: 1,
        pathId: 1,
        toId: 1,
      },
      expected: {
        isValid: false,
        errorMessages: [
          generateNextErrorMessage('トリガ', 'トリガ'),
          generatePreviousErrorMessage('トリガ', 'トリガ'),
          generatePreviousErrorMessage('トリガ', '遷移'),
        ],
      },
    };

    const result = validateRelation(test.input);

    expect(test.expected.isValid).toStrictEqual(result.isValid);
    expect(test.expected.errorMessages.length).toBe(result.errors.length);

    test.expected.errorMessages.forEach((message, index) => {
      expect(message).toBe(result.errors[index].getError().message);
    });
  });

  it('トリガの次に通信とトリガが来たとき、エラーが発生する', () => {
    const test = {
      input: {
        fromId: 1,
        pathId: 2,
        toId: 1,
      },
      expected: {
        isValid: false,
        errorMessages: [
          generateNextErrorMessage('トリガ', 'トリガ'),
          generateNextErrorMessage('トリガ', '通信'),
          generatePreviousErrorMessage('通信', 'トリガ'),
          generatePreviousErrorMessage('トリガ', 'トリガ'),
          generatePreviousErrorMessage('トリガ', '通信'),
        ],
      },
    };

    const result = validateRelation(test.input);

    expect(test.expected.isValid).toStrictEqual(result.isValid);
    expect(test.expected.errorMessages.length).toBe(result.errors.length);

    test.expected.errorMessages.forEach((message, index) => {
      expect(message).toBe(result.errors[index].getError().message);
    });
  });
});
