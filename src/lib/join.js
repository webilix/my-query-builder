const queryData = require('../scripts/query-data');
const queryField = require('../scripts/query-field');
const system = require('../scripts/system');

const getJoin = join => {
    if (!system.isExactObject(join)) {
        throw TypeError('Each join query data must be an object');
    }

    let type = system.getObject(join).key;
    if (['$LEFT', '$RIGHT', '$INNER'].includes(type)) {
        join = join[type];
        type = type.substr(1) + ' ';
    } else type = '';

    const { key: table, value } = system.getObject(join);
    if (!system.isExactObject(value)) {
        throw TypeError('Each join query inner data must be an object');
    }

    const { key: field, value: equal } = system.getObject(value);

    return `${type}JOIN ${queryField(table)} ON (${queryField(table + '.' + field)} = ${queryField(equal)})`;
};

module.exports = function(...joins) {
    for (var j = 0; j < joins.length; j++) {
        joins[j] = getJoin(joins[j]);
    }

    if (joins.length != 0) {
        queryData.set('join', ' ' + joins.join(' '));
    }
    return this;
};

module.exports.get = () => {
    return queryData.get('join') || '';
};
