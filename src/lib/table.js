const queryData = require('../scripts/query-data');

module.exports = function(table) {
    if (typeof table !== 'string') {
        throw new TypeError('Table name must be string');
    }

    queryData.set('table', table);
    return this;
};

module.exports.get = () => {
    let table = queryData.get('table');
    if (!table) table = queryData.table;
    if (!table) {
        throw new TypeError('Table name is not specified');
    }

    return '`' + table + '`';
};
