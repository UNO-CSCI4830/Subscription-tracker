//daysLeft function //
function daysLeft(iso) {
    const today = new Date();
    const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d = parseDate(iso);
    const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.ceil((b-a) / (1000 * 60 * 60 * 24));
}
module.exports = daysLeft;

// bucketColor function //
function bucketColor(days) {
    if (days <= 7) return "soon";
    if (days <= 30) return "mid";
    return "good";
}
module.exports = bucketColor;

// parseDate function //
function parseDate(iso) {
    const p = (iso || "").split("-").map(Number);
    return new Date(p[0], (p[1] || 1) - 1, p[2] ||1);
}
module.exports = parseDate;

// monthlyEstimate function //
function monthlyEstimate(price, cycle) {
    price = Number(price || 0);
    if (cycle === "yearly") return price /12;
    if (cycle === "weekly") return (price * 52) / 12;
    return price;
}
module.exports = monthlyEstimate;

