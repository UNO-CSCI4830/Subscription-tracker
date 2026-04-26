function bucketColor(days) {
    if (days <= 7) return "soon";
    if (days <= 30) return "mid";
    return "good";
}
module.exports = bucketColor;