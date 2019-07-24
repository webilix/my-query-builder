const queryField = require('./query-field');
const queryValue = require('./query-value');
const system = require('./system');

getQuery = (not, query) => {
    if (!not) return query;
    return `(NOT ${query})`;
};

module.exports = query => {
    if (!system.isExactObject(query)) {
        throw TypeError('Each WHERE/HAVING query data must be an object');
    }

    let not = false;
    if (system.getObject(query).key === '$NOT') {
        query = query['$NOT'];
        not = true;
    }

    const { key: field, value } = system.getObject(query);
    switch (typeof value) {
        case 'number':
        case 'string':
            return getQuery(not, `(${queryField(field)} = ${queryValue(value)})`);

        case 'object':
            if (value === null) {
                return getQuery(not, `ISNULL(${queryField(field)})`);
            }

            if (system.isDate(value)) {
                return getQuery(not, `(${queryField(field)} = ${queryValue(value)})`);
            }

            const { key, value: expresion } = system.getObject(value);
            switch (key) {
                case '$EQ':
                    return getQuery(not, `(${queryField(field)} = ${queryValue(expresion)})`);

                case '$NE':
                    return getQuery(not, `(${queryField(field)} <> ${queryValue(expresion)})`);

                case '$BETWEEN':
                    for (let v = 0; v < expresion.length; v++) expresion[v] = queryValue(expresion[v]);
                    return getQuery(not, `(${queryField(field)} BETWEEN ${expresion[0]} AND ${expresion[1]})`);

                case '$IN':
                    for (let v = 0; v < expresion.length; v++) expresion[v] = queryValue(expresion[v]);
                    return getQuery(not, `(${queryField(field)} IN (${expresion.join(', ')}))`);

                case '$LIKE':
                    return getQuery(not, `(${queryField(field)} LIKE ${queryValue('%' + expresion + '%')})`);
                case '$LLIKE':
                    return getQuery(not, `(${queryField(field)} LIKE ${queryValue('%' + expresion)})`);
                case '$RLIKE':
                    return getQuery(not, `(${queryField(field)} LIKE ${queryValue(expresion + '%')})`);

                case '$LT':
                    return getQuery(not, `(${queryField(field)} < ${queryValue(expresion)})`);
                case '$LTE':
                    return getQuery(not, `(${queryField(field)} <= ${queryValue(expresion)})`);

                case '$GT':
                    return getQuery(not, `(${queryField(field)} > ${queryValue(expresion)})`);
                case '$GTE':
                    return getQuery(not, `(${queryField(field)} >= ${queryValue(expresion)})`);

                default:
                    throw TypeError(`${key.toUpperCase()} condition is not supported`);
            }
    }
};
