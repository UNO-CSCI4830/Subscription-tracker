const { afterEach } = require('node:test');
const daysLeft = require('./daysLeft');
const parseDate = require('./parseDate');
beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date("2026-04-25T12:00:00"));
});

afterEach(() => {
    jest.useRealTimers();
});

test("returns 0 days left when it is today (for now its April 25)", () => {
    expect(daysLeft("2026-04-25")).toBe(0);
});

test("returns 5 days left when it is in this case April 30th", () => {
    expect(daysLeft("2026-04-30")).toBe(5);
});

test("return 30 days left when it is May 25th", () => {
    expect(daysLeft("2026-05-25")).toBe(30);
});