const queryData = require('../scripts/query-data');

module.exports = function(skip) {
    if (typeof skip !== 'number') {
        throw new TypeError('Skip value must be number');
    }

    queryData.set('skip', skip);
    return this;
};

module.exports.get = () => {
    return queryData.get('skip');
};
