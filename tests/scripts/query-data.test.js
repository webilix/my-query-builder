const queryDate = require('../../src/scripts/query-data');

test("queryDate: check table name's type errpr", () => {
    const test = () => {
        queryDate.table = new Date();
    };
    expect(test).toThrow(TypeError);
});

test('queryDate: undefined', () => {
    const test = queryDate.get('test');
    expect(test).toBe(null);
});

test('queryDate: clear', () => {
    queryDate.set('test', 'TEST');
    queryDate.clear();
    const test = queryDate.get('test');
    expect(test).toBe(null);
});

test('queryDate: set / get data', () => {
    queryDate.clear();
    queryDate.set('test', 'TEST');
    const test = queryDate.get('test');
    expect(test).toBe('TEST');
});
