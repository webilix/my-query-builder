const table = require('../../src/lib/table');

test('Check table name error', () => {
    const test = () => {
        table(new Date());
    };

    expect(test).toThrow(TypeError);
});
