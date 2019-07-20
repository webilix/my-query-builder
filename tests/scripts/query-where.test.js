const queryWhere = require('../../src/scripts/query-where');

test('queryWhere: check number values result', () => {
    const test = queryWhere({ field: 0 });
    expect(test).toBe('(`field` = 0)');
});

test('queryWhere: check null values result', () => {
    const test = queryWhere({ field: null });
    expect(test).toBe('ISNULL(`field`)');
});

test('queryWhere: check not null values result', () => {
    const test = queryWhere({ $NOT: { field: null } });
    expect(test).toBe('(NOT ISNULL(`field`))');
});

test('queryWhere: check string values result', () => {
    const test = queryWhere({ field: 'value' });
    expect(test).toBe("(`field` = 'value')");
});

test('queryWhere: check $NE option values result', () => {
    const test = queryWhere({ field: { $NE: 'value' } });
    expect(test).toBe("(`field` <> 'value')");
});

test('queryWhere: check $BETWEEN option values result', () => {
    const test = queryWhere({ field: { $BETWEEN: [1, 2] } });
    expect(test).toBe('(`field` BETWEEN 1 AND 2)');
});

test('queryWhere: check $IN option values result', () => {
    const test = queryWhere({ field: { $IN: [1, 2, 3] } });
    expect(test).toBe('(`field` IN (1, 2, 3))');
});

test('queryWhere: check $LIKE option values result', () => {
    const test = queryWhere({ field: { $LIKE: 'value' } });
    expect(test).toBe("(`field` LIKE '%value%')");
});

test('queryWhere: check $LLIKE option values result', () => {
    const test = queryWhere({ field: { $LLIKE: 'value' } });
    expect(test).toBe("(`field` LIKE '%value')");
});

test('queryWhere: check $RLIKE option values result', () => {
    const test = queryWhere({ field: { $RLIKE: 'value' } });
    expect(test).toBe("(`field` LIKE 'value%')");
});

test('queryWhere: check $LT option values result', () => {
    const test = queryWhere({ field: { $LT: 1 } });
    expect(test).toBe('(`field` < 1)');
});

test('queryWhere: check $LTE option values result', () => {
    const test = queryWhere({ field: { $LTE: 1 } });
    expect(test).toBe('(`field` <= 1)');
});

test('queryWhere: check $GT option values result', () => {
    const test = queryWhere({ field: { $GT: 1 } });
    expect(test).toBe('(`field` > 1)');
});

test('queryWhere: check $GTE option values result', () => {
    const test = queryWhere({ field: { $GTE: 1 } });
    expect(test).toBe('(`field` >= 1)');
});

test('queryWhere: check query data error', () => {
    const test = () => {
        queryWhere(new Date());
    };
    expect(test).toThrow(TypeError);
});

test('queryWhere: check unknow condition error', () => {
    const test = () => {
        queryWhere({ field: { $NONE: 1 } });
    };
    expect(test).toThrow(TypeError);
});
