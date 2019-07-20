const group = require('../../src/lib/group');

test('Check group name type error', () => {
    const test = () => {
        group(new Date());
    };

    expect(test).toThrow(TypeError);
});
