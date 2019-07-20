const queryField = require('../../src/scripts/query-field');

test('queryField: check number values result', () => {
    const test = queryField(1);
    expect(test).toBe(1);
});

test('queryField: check field name result', () => {
    const test = queryField('field');
    expect(test).toBe('`field`');
});

test('queryField: check table.field name result', () => {
    const test = queryField('table.field');
    expect(test).toBe('`table`.`field`');
});

test('queryField: check basic object result', () => {
    const test = queryField({ field: 'name' });
    expect(test).toBe('`field` AS `name`');
});

test('queryField: check object:null result', () => {
    const test = queryField(null);
    expect(test).toBe("''");
});

test('queryField: check object:$ result', () => {
    const test = queryField({ field: '$-' });
    expect(test).toBe("`field` AS '-'");
});

test('queryField: check object:complex result', () => {
    const test = queryField({ $SUM: 'field' });
    expect(test).toBe('SUM(`field`)');
});

test('queryField: check object:full result', () => {
    const test = queryField({ $SUM: { field: 'name' } });
    expect(test).toBe('SUM(`field`) AS `name`');
});

test('queryField: check function argument result', () => {
    const test = queryField({ $CONCAT: { name: 'fullName' }, $ARGS: ['$ ', 'famiy'] });
    expect(test).toBe("CONCAT(`name`, ' ', `famiy`) AS `fullName`");
});

test('queryField: unsuported function', () => {
    const test = () => {
        queryField({ $SUMS: 'field' });
    };
    expect(test).toThrow(TypeError);
});

test('queryField: function argument error', () => {
    const test = () => {
        queryField({ $CONCAT: 'field' });
    };
    expect(test).toThrow(TypeError);
});
