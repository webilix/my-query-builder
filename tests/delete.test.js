const DELETE = require('../src/delete');

test('Check simple DELETE query result', () => {
    const test = DELETE()
        .from('table')
        .get();
    expect(test).toBe('DELETE FROM `table`');
});

test('Check full DELETE query result', () => {
    const test = DELETE()
        .from('table')
        .where({ field: 'value' })
        .unique()
        .get();
    expect(test).toBe("DELETE FROM `table` WHERE ((`field` = 'value')) LIMIT 1");
});
