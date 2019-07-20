const queryData = require('../scripts/query-data');

module.exports = function(unique) {
    unique = typeof unique === 'undefined' ? true : unique;
    if (typeof unique !== 'boolean') {
        throw new TypeError('Unique type must be boolean');
    }

    queryData.set('unique', unique);
    return this;
};

module.exports.get = () => {
    return queryData.get('unique');
};
