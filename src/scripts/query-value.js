const system = require('./system');

module.exports = value => {
    switch (typeof value) {
        case 'number':
            return value;

        case 'string':
            if (value === '$NOW') {
                return `'${system.getDate(new Date())}'`;
            }

            return `'${system.addSlashes(value)}'`;

        case 'object':
            if (value === null) {
                return 'NULL';
            }

            if (system.isDate(value)) {
                return `'${system.getDate(value)}'`;
            }

            if (Array.isArray(value)) {
                value = { ...value };
            }

            const check = system.getObject(value).key;
            if (['$DATE', '$TIME', '$TIMESTAMP', '$YEAR'].includes(check)) {
                let date = system.getObject(value).value;
                if (date === '$NOW') date = new Date();

                const result = system.getDate(date, check.substr(1));
                switch (typeof result) {
                    case 'number':
                        return result;
                    case 'string':
                        return `'${result}'`;
                }
            }

            return `'${system.addSlashes(JSON.stringify(value))}'`;
    }
};
