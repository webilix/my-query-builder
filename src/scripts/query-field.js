const system = require('./system');

module.exports = getField = field => {
    switch (typeof field) {
        case 'number':
            return field;

        case 'string':
            if (field == '*') {
                return '*';
            }

            if (field.substr(0, 1) === '$') {
                return `'${field.substr(1)}'`;
            }

            if (field.indexOf('.') === -1) {
                return '`' + field + '`';
            }

            const [table, name] = field.split('.');
            return '`' + table + '`.`' + name + '`';

        case 'object':
            if (field === null) {
                return `''`;
            }

            const { key, value } = system.getObject(field);

            if (key.substr(0, 1) !== '$') {
                return `${getField(key)} AS ${getField(value)}`;
            }

            const func = key.substr(1);
            const list = system.getFieldFunctions();
            if (!Object.keys(list).includes(func)) {
                throw TypeError(`${func.toUpperCase()} function is not supported`);
            }

            const args = field['$ARGS'];
            if (list[func] && typeof args == 'undefined') {
                throw TypeError(`${func.toUpperCase()} function must have $ARGS as input values`);
            }

            let extra = '';
            if (list[func]) {
                for (var a = 0; a < args.length; a++) {
                    args[a] = getField(args[a]);
                }
                extra = `, ${args.join(', ')}`;
            }

            switch (typeof value) {
                case 'string':
                    return `${func}(${getField(value)}${extra})`;

                case 'object':
                    const { key: input, value: alias } = system.getObject(value);
                    return `${func}(${getField(input)}${extra}) AS ${getField(alias)}`;
            }
    }
};
