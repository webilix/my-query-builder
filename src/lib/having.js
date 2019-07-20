const queryData = require('../scripts/query-data');
const queryWhere = require('../scripts/query-where');

module.exports = function(...queries) {
    const having = [];
    for (var q = 0; q < queries.length; q++) {
        if (!Array.isArray(queries[q])) having.push(queryWhere(queries[q]));
        else {
            for (var a = 0; a < queries[q].length; a++) {
                queries[q][a] = queryWhere(queries[q][a]);
            }
            having.push(`(${queries[q].join(' OR ')})`);
        }
    }

    if (having.length != 0) {
        queryData.set('having', ` HAVING (${having.join(' AND ')})`);
    }
    return this;
};

module.exports.get = () => {
    return queryData.get('having') || '';
};
