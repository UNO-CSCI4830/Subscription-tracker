const parseDate = require('./parseDate');

test("parses the date with full input", () => {
    const d = parseDate("2026-04-25");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(3);
    expect(d.getDate()).toBe(25);
});

test("defaults to January 1st when month and day is empty", () => {
    const d = parseDate("2026")
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);
});

test("defaults to 1 when there is day is empty", () => {
    const d = parseDate("2026-04");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(3); // years start with 0 here so April is 3 
    expect(d.getDate()).toBe(1);
});

//test("fixes no input", () => {
   // const d = parseDate("");
   // expect(isNan(d.getFullYear())).toBe(true);
//})