const queryData = require('../scripts/query-data');

module.exports = function(limit) {
    if (typeof limit !== 'number') {
        throw new TypeError('Limit value must be number');
    }

    queryData.set('limit', limit);
    return this;
};

module.exports.get = (skip, unique) => {
    const limit = unique ? 1 : queryData.get('limit');
    if (!limit) return '';

    skip = skip ? skip + ', ' : '';
    return ` LIMIT ${skip}${limit}`;
};
