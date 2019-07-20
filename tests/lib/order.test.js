const order = require('../../src/lib/order');

test('Check order data type error', () => {
    const test = () => {
        order(new Date());
    };

    expect(test).toThrow(TypeError);
});

test('Check order type error', () => {
    const test = () => {
        order({ field: new Date() });
    };

    expect(test).toThrow(TypeError);
});

test('Check order result for $ASC', () => {
    order({ field: '$ASC' });
    const test = order.get();

    expect(test).toBe(' ORDER BY `field` ASC');
});

test('Check order result for $DESC', () => {
    order({ field: '$DESC' });
    const test = order.get();

    expect(test).toBe(' ORDER BY `field` DESC');
});
