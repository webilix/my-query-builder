const _data = {
    table: '',
    data: {}
};

const queryData = {
    set table(table) {
        if (typeof table !== 'string') {
            throw new TypeError('Table name must be string');
        }

        _data.table = table;
    },

    get table() {
        return _data.table;
    },

    clear() {
        for (key in _data.data) {
            delete _data.data[key];
        }
    },

    set(data, value) {
        _data.data[data] = value;
    },

    get(data) {
        return typeof _data.data[data] === 'undefined' ? null : _data.data[data];
    }
};

module.exports = queryData;
