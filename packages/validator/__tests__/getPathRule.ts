import { getPathRule } from '../generate';

describe('getPathRule', () => {
  it('遷移', () => {
    const result = getPathRule(1);
    expect(result).toMatchSnapshot();
  });

  it('通信', () => {
    const result = getPathRule(2);
    expect(result).toMatchSnapshot();
  });
});
