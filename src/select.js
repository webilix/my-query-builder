const queryData = require('./scripts/query-data');
const queryField = require('./scripts/query-field');

const SELECT = (...fields) => {
    queryData.clear();
    for (var f = 0; f < fields.length; f++) {
        fields[f] = queryField(fields[f]);
    }

    fields = fields.length == 0 ? '*' : fields.join(', ');
    queryData.set('select', ' ' + fields);
    return SELECT;
};

module.exports = SELECT;
module.exports.from = table = require('./lib/table');
module.exports.join = join = require('./lib/join');
module.exports.where = where = require('./lib/where');
module.exports.group = group = require('./lib/group');
module.exports.having = having = require('./lib/having');
module.exports.order = order = require('./lib/order');
module.exports.unique = unique = require('./lib/unique');
module.exports.skip = skip = require('./lib/skip');
module.exports.limit = limit = require('./lib/limit');

module.exports.get = () => {
    return (
        'SELECT' +
        queryData.get('select') +
        ' FROM ' +
        table.get() +
        join.get() +
        where.get() +
        group.get() +
        having.get() +
        order.get() +
        limit.get(skip.get(), unique.get())
    );
};
