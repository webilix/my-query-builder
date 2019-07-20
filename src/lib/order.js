const queryData = require('../scripts/query-data');
const queryField = require('../scripts/query-field');
const system = require('../scripts/system');

const getorder = order => {
    if (!system.isExactObject(order)) {
        throw TypeError('Each order data must be an object');
    }

    const { key: field, value: type } = system.getObject(order);
    if (!['$ASC', '$DESC'].includes(type)) {
        throw TypeError('Each order type must be one of $ASC or $DESC');
    }

    return `${queryField(field)} ${type.substr(1)}`;
};

module.exports = function(...orders) {
    for (var o = 0; o < orders.length; o++) {
        if (orders[o] == '$RAND') {
            orders[o] = 'RAND()';
        } else orders[o] = getorder(orders[o]);
    }

    if (orders.length != 0) {
        queryData.set('order', ` ORDER BY ${orders.join(', ')}`);
    }
    return this;
};

module.exports.get = () => {
    return queryData.get('order') || '';
};
