const skip = require('../../src/lib/skip');

test('Check skip value error', () => {
    const test = () => {
        skip(new Date());
    };

    expect(test).toThrow(TypeError);
});
