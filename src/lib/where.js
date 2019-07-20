const queryData = require('../scripts/query-data');
const queryWhere = require('../scripts/query-where');

module.exports = function(...queries) {
    const where = [];
    for (var q = 0; q < queries.length; q++) {
        if (!Array.isArray(queries[q])) where.push(queryWhere(queries[q]));
        else {
            for (var a = 0; a < queries[q].length; a++) {
                queries[q][a] = queryWhere(queries[q][a]);
            }
            where.push(`(${queries[q].join(' OR ')})`);
        }
    }

    if (where.length != 0) {
        queryData.set('where', ` WHERE (${where.join(' AND ')})`);
    }
    return this;
};

module.exports.get = () => {
    return queryData.get('where') || '';
};
