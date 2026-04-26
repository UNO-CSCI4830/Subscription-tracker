const bucketColor = require('./bucketColor');

test("returns 'soon' for days <= 7'", () => {
    expect(bucketColor(days = 5)).toBe("soon");
});

test("returns 'mid' for days between 8 and 30", () => {
    expect(bucketColor(days = 15)).toBe("mid");
});

test("returns 'good' for days > 30", () => {
    expect(bucketColor(days = 45)).toBe("good");
});
