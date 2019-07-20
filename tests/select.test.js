const SELECT = require('../src/select');

test('Check missing Table name error', () => {
    const test = () => {
        SELECT().get();
    };
    expect(test).toThrow(TypeError);
});

test('Check simple SELECT query result', () => {
    const test = SELECT()
        .from('table')
        .get();
    expect(test).toBe('SELECT * FROM `table`');
});

test('Check full SELECT query result', () => {
    const test = SELECT('field')
        .from('table')
        .join({ join: { field: 'table.field' } })
        .where({ field: 1 })
        .group('field')
        .having({ field: null })
        .order({ field: '$ASC' })
        .skip(100)
        .limit(10)
        .get();
    expect(test).toBe(
        'SELECT `field` FROM `table` JOIN `join` ON (`join`.`field` = `table`.`field`) WHERE ((`field` = 1)) GROUP BY `field` HAVING (ISNULL(`field`)) ORDER BY `field` ASC LIMIT 100, 10'
    );
});
