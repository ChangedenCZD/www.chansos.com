let DateFormat = require('dateformat');

function format (date, formatString) {
    return DateFormat(date, formatString);
}

module.exports = {
    DateFormat: DateFormat,
    format: format
};