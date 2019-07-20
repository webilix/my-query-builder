exports.isExactObject = data => {
    return typeof data === 'object' && !this.isDate(data) && data !== null && !Array.isArray(data);
};

exports.isObject = data => {
    return typeof data === 'object';
};

exports.getObject = data => {
    const key = Object.keys(data)[0];
    const value = data[key];
    return { key, value };
};

exports.isDate = value => {
    return Object.prototype.toString.call(value) === '[object Date]';
};

exports.zeroFill = zeroFill = value => {
    value += '';
    return (value < 10 ? '0' : '') + value;
};

exports.getDate = (value, type) => {
    const date = value.getFullYear() + '-' + zeroFill(value.getMonth() + 1) + '-' + zeroFill(value.getDate());
    const time = zeroFill(value.getHours()) + ':' + zeroFill(value.getMinutes()) + ':' + zeroFill(value.getSeconds());
    switch (type) {
        case 'YEAR':
            return value.getFullYear();
        case 'TIMESTAMP':
            return Math.floor(value.getTime() / 1000);
        case 'DATE':
            return date;
        case 'TIME':
            return time;
        default:
            return date + ' ' + time;
    }
};

exports.addSlashes = value => {
    value += '';
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\u0008/g, '\\b')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\f/g, '\\f')
        .replace(/\r/g, '\\r')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');
};

exports.getFieldFunctions = () => {
    return {
        DISTINCT: false,

        SUM: false,
        AVG: false,
        MAX: false,
        MIN: false,
        COUNT: false,

        ASCII: false,
        BIN: false,
        OCT: false,
        ORD: false,
        HEX: false,
        UNHEX: false,
        BIT_LENGTH: false,
        TO_BASE64: false,
        FROM_BASE64: false,

        DATE: false,
        TIME: false,
        YEAR: false,
        MONTH: false,
        MONTHNAME: false,
        WEEK: false,
        DAYOFYEAR: false,
        DAYOFMONTH: false,
        DAYOFWEEK: false,
        HOUR: false,
        MINUTE: false,
        SECOND: false,
        UNIX_TIMESTAMP: false,

        LENGTH: false,
        LCASE: false,
        LOWER: false,
        LTRIM: false,
        RTRIM: false,
        SPACE: false,
        TRIM: false,
        UCASE: false,
        UPPER: false,
        REVERSE: false,

        CONCAT: true,
        FORMAT: true,
        INSTR: true,
        LEFT: true,
        REPLACE: true,
        LPAD: true,
        RPAD: true,
        SUBSTR: true,
        SUBSTRING: true,
        DATE_FORMAT: true
    };
};
