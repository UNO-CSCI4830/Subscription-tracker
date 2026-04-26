const monthlyEstimate = require('./monthlyEstimate');

test("return price as is", () => {
    expect(monthlyEstimate(200)).toBe(200);
});

test("return weekly price as monthly price", () => {
    expect(monthlyEstimate(30, "weekly")).toBe(130);
});

test("return yearly price as monthly price", () => {
    expect(monthlyEstimate(2400, "yearly")).toBe(200);
});

test("makes a string number into the price number", () => {
    expect(monthlyEstimate("200")).toBe(200);
});