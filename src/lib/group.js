const queryData = require('../scripts/query-data');
const queryField = require('../scripts/query-field');

module.exports = function(...groups) {
    for (var g = 0; g < groups.length; g++) {
        if (typeof groups[g] !== 'string') {
            throw new TypeError('Group field name must be string');
        }

        groups[g] = queryField(groups[g]);
    }

    if (groups.length != 0) {
        queryData.set('group', ` GROUP BY ${groups.join(', ')}`);
    }
    return this;
};

module.exports.get = () => {
    return queryData.get('group') || '';
};
