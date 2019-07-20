const queryData = require('./scripts/query-data');
const queryField = require('./scripts/query-field');
const queryValue = require('./scripts/query-value');

const UPDATE = fields => {
    queryData.clear();

    const data = [];
    for (field in fields) {
        data.push(`${queryField(field)} = ${queryValue(fields[field])}`);
    }

    queryData.set('update', ' ' + data.join(', '));
    return UPDATE;
};

module.exports = UPDATE;
module.exports.table = table = require('./lib/table');
module.exports.where = where = require('./lib/where');
module.exports.unique = unique = require('./lib/unique');
module.exports.limit = limit = require('./lib/limit');

module.exports.get = () => {
    return 'UPDATE ' + table.get() + ' SET' + queryData.get('update') + where.get() + limit.get(null, unique.get());
};
