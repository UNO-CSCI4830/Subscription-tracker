function monthlyEstimate(price, cycle) {
    price = Number(price || 0);
    if (cycle === "yearly") return price /12;
    if (cycle === "weekly") return (price * 52) / 12;
    return price;
}
module.exports = monthlyEstimate;
