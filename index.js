const queryData = require('./src/scripts/query-data');

module.exports = {
    TABLE(table) {
        queryData.table = table;
    },

    SELECT: require('./src/select'),
    INSERT: require('./src/insert'),
    UPDATE: require('./src/update'),
    DELETE: require('./src/delete')
};
