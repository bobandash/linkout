import camelize from '../camelize';

describe('Camelize Function', () => {
  it('returns lower case characters if only one word', () => {
    const output = camelize('Word');
    expect(output).toBe('word');
  });

  it('returns camelized version of words', () => {
    const output = camelize('WordWordWord');
    expect(output).toBe('wordWordWord');
  });

  it('returns camelized version of words', () => {
    const output = camelize('Word Word Word');
    expect(output).toBe('wordWordWord');
  });
});
