const UPDATE = require('../src/update');

test('Check simple UPDATE query result', () => {
    const test = UPDATE({ field: 'value' })
        .table('table')
        .get();
    expect(test).toBe("UPDATE `table` SET `field` = 'value'");
});

test('Check full UPDATE query result', () => {
    const test = UPDATE({ field: 'value' })
        .table('table')
        .where({ field: 'value' })
        .unique()
        .get();
    expect(test).toBe("UPDATE `table` SET `field` = 'value' WHERE ((`field` = 'value')) LIMIT 1");
});
