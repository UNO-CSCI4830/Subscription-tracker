const alltests = require('./alltests');
const daysLeft = require('./daysLeft');
const parseDate = require('./parseDate');
const monthlyEstimate = require('./monthlyEstimate');
const bucketColor = require('./bucketColor');

// test for the daysLeft function //
const { afterEach } = require('node:test');
//const daysLeft = require('./daysLeft');
//const parseDate = require('./parseDate');
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


// test for the bucketColor function // 
//const bucketColor = require('./bucketColor');

test("returns 'soon' for days <= 7'", () => {
    expect(bucketColor(days = 5)).toBe("soon");
});

test("returns 'mid' for days between 8 and 30", () => {
    expect(bucketColor(days = 15)).toBe("mid");
});

test("returns 'good' for days > 30", () => {
    expect(bucketColor(days = 45)).toBe("good");
});

// test for the parseDate function //
// based on 0-11  so months like January is 0 and April is 3 //
//const parseDate = require('./parseDate');

test("parses the date", () => {
    const d = parseDate("2026-04-25");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(3);
    expect(d.getDate()).toBe(25);
});

test("defaults to January 1st if date and month is empty", () => {
    const d = parseDate("2026");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);
});

test("defaults to April 1st if day is empty", () => {
    const d = parseDate("2026-04");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(3);
    expect(d.getDate()).toBe(1);
});

//test for the monthlyEstimate function //
//const monthlyEstimate = require('./monthlyEstimate');

test("return price as is", () => {
    expect(monthlyEstimate(200)).toBe(200);
});

test("return weekly price as monthly price", () => {
    expect(monthlyEstimate(30, "weekly")).toBe(130);
});

test("return yearly price as monthly price", () => {
    expect(monthlyEstimate(2400, "yearly")).toBe(200);
});

test("makes a string price into the price number", () => {
    expect(monthlyEstimate("200")).toBe(200);
});