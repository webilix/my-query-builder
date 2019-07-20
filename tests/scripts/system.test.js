const system = require('../../src/scripts/system');

test('isObject: should returns true for object', () => {
    const test = system.isObject({});
    expect(test).toBe(true);
});

test('isObject: should returns true for array', () => {
    const test = system.isObject([]);
    expect(test).toBe(true);
});

test('isObject: should returns true for Date', () => {
    const test = system.isObject(new Date());
    expect(test).toBe(true);
});

test('isObject: should returns true for null', () => {
    const test = system.isObject(null);
    expect(test).toBe(true);
});

test('isObject: should returns false', () => {
    const test = system.isObject(1);
    expect(test).toBe(false);
});

test('getObject: should returns specific value', () => {
    const test = system.getObject({ $NAME: 'name' });
    expect(test).toStrictEqual({ key: '$NAME', value: 'name' });
});

test('isDate: should returns true', () => {
    const test = system.isDate(new Date());
    expect(test).toBe(true);
});

test('isDate: should returns false', () => {
    const test = system.isDate(null);
    expect(test).toBe(false);
});

test('zeroFill: should returns specific value', () => {
    const test = system.zeroFill(3);
    expect(test).toBe('03');
});

test('getDate: should returns specific value', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = system.getDate(date);
    expect(test).toBe('1979-06-03 01:23:45');
});

test('getDate: should returns specific value (YEAR type)', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = system.getDate(date, 'YEAR');
    expect(test).toBe(1979);
});

test('getDate: should returns specific value (TIMESTAMP type)', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = system.getDate(date, 'TIMESTAMP');
    expect(test).toBe(297204825);
});

test('getDate: should returns specific value (DATE type)', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = system.getDate(date, 'DATE');
    expect(test).toBe('1979-06-03');
});

test('getDate: should returns specific value (TIME type)', () => {
    const date = new Date('1979-06-03 01:23:45');
    const test = system.getDate(date, 'TIME');
    expect(test).toBe('01:23:45');
});

test('addSlashes: should returns specific value', () => {
    const text = `' " \\ \n \r \t`;
    const test = system.addSlashes(text);
    expect(test).toBe(`\\' \\" \\\\ \\n \\r \\t`);
});

test('getFieldFunctions: check defined function number', () => {
    const test = system.getFieldFunctions();
    let number = 0;
    for (func in test) number++;
    expect(number).toBe(48);
});
