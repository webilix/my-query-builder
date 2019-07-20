const unique = require('../../src/lib/unique');

test('Check unique type error', () => {
    const test = () => {
        unique(new Date());
    };

    expect(test).toThrow(TypeError);
});
