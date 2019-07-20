const INSERT = require('../src/insert');

test('Check full INSERT query result', () => {
    const test = INSERT({ field: 'value' })
        .into('table')
        .get();
    expect(test).toBe("INSERT INTO `table` (`field`) VALUES ('value')");
});
