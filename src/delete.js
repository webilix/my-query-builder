const queryData = require('./scripts/query-data');

const DELETE = () => {
    queryData.clear();
    return DELETE;
};

module.exports = DELETE;
module.exports.from = table = require('./lib/table');
module.exports.where = where = require('./lib/where');
module.exports.unique = unique = require('./lib/unique');
module.exports.limit = limit = require('./lib/limit');

module.exports.get = () => {
    return 'DELETE FROM ' + table.get() + where.get() + limit.get(null, unique.get());
};
