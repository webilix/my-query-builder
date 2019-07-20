const queryValue = require('../../src/scripts/query-value');

test('queryValue: check number values result', () => {
    const test = queryValue(1);
    expect(test).toBe(1);
});

test('queryValue: check string values result', () => {
    const test = queryValue('string');
    expect(test).toBe("'string'");
});

test('queryValue: check $NOW values result', () => {
    const test = queryValue('$NOW');
    expect(test.length).toBe(21);
    expect(test.substr(0, 1)).toBe("'");
    expect(test.substr(-1)).toBe("'");
});

test('queryValue: check null values result', () => {
    const test = queryValue(null);
    expect(test).toBe('NULL');
});

test('queryValue: check Date values result', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = queryValue(date);
    expect(test).toBe(`'1979-06-03 01:23:45'`);
});

test('queryValue: check Date values with DATE option result', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = queryValue({ $DATE: date });
    expect(test).toBe(`'1979-06-03'`);
});

test('queryValue: check Date values with TIME option result', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = queryValue({ $TIME: date });
    expect(test).toBe(`'01:23:45'`);
});

test('queryValue: check Date values with YEAR option result', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = queryValue({ $YEAR: date });
    expect(test).toBe(1979);
});

test('queryValue: check Date values with TIMESTAMP option result', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = queryValue({ $TIMESTAMP: date });
    expect(test).toBe(297204825);
});

test('queryValue: check Array values', () => {
    const test = queryValue([]);
    expect(test).toBe(`'{}'`);
});

test('queryValue: check Object values', () => {
    const test = queryValue({});
    expect(test).toBe(`'{}'`);
});
