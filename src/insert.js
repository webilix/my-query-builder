const queryData = require('./scripts/query-data');
const queryField = require('./scripts/query-field');
const queryValue = require('./scripts/query-value');

const INSERT = fields => {
    queryData.clear();

    const data = {
        field: [],
        value: []
    };
    for (field in fields) {
        data.field.push(queryField(field));
        data.value.push(queryValue(fields[field]));
    }

    queryData.set('insert', ` (${data.field.join(', ')}) VALUES (${data.value.join(', ')})`);
    return INSERT;
};

module.exports = INSERT;
module.exports.into = table = require('./lib/table');

module.exports.get = () => {
    return 'INSERT INTO ' + table.get() + queryData.get('insert');
};
