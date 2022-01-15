import { getTaskRule } from '../generate';

describe('getTaskRule', () => {
  it('トリガ', () => {
    const result = getTaskRule(1);
    expect(result).toMatchSnapshot();
  });

  it('入出力', () => {
    const result = getTaskRule(2);
    expect(result).toMatchSnapshot();
  });

  it('システムからの入力', () => {
    const result = getTaskRule(3);
    expect(result).toMatchSnapshot();
  });

  it('システムからの出力', () => {
    const result = getTaskRule(4);
    expect(result).toMatchSnapshot();
  });

  it('処理', () => {
    const result = getTaskRule(5);
    expect(result).toMatchSnapshot();
  });

  it('データストア', () => {
    const result = getTaskRule(6);
    expect(result).toMatchSnapshot();
  });
});
