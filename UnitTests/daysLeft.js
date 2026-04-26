const parseDate = require('./parseDate');

function daysLeft(iso) {
    const today = new Date();
    const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d = parseDate(iso);
    const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.ceil((b-a) / (1000 * 60 * 60 * 24));
}
module.exports = daysLeft;