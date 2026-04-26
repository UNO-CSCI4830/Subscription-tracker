function parseDate(iso) {
    const p = (iso || "").split("-").map(Number);
    return new Date(p[0], (p[1] || 1) - 1, p[2] ||1);
}

module.exports = parseDate;
