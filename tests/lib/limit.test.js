const limit = require('../../src/lib/limit');

test('Check limit value error', () => {
    const test = () => {
        limit(new Date());
    };

    expect(test).toThrow(TypeError);
});
