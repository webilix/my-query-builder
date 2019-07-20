const join = require('../../src/lib/join');

test('Check join data type error', () => {
    const test = () => {
        join(new Date());
    };

    expect(test).toThrow(TypeError);
});

test('Check join inner data type error', () => {
    const test = () => {
        join({ date: new Date() });
    };

    expect(test).toThrow(TypeError);
});
