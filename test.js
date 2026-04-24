const {sortSubscriptions} = require("./Util")
describe('Sorting function testing', () => {

// 1
// Testing sorting function: By name A-Z
test('expect new list from A to Z ', () => {
    const subs = [
        { name: "X" },
        { name: "D" },
        { name: "A" }
    ];

    const result = sortSubscriptions(subs, "az");
    expect(result[0].name).toBe("A");
    expect(result[1].name).toBe("D");
    expect(result[2].name).toBe("X");
    });


// 2
// Testing sorting function: By name Z-A
test('expect new list from Z to A ', () => {
    const subs = [
        { name: "X" },
        { name: "D" },
        { name: "A" }
    ];

    const result = sortSubscriptions(subs, "za");
    expect(result[0].name).toBe("X");
    expect(result[1].name).toBe("D");
    expect(result[2].name).toBe("A");
    });

// 3
// Testing sorting function: By price high-low
test('expect new list by price from high to low', () => {
    const subs = [
        { price: "12.3" },
        { price: "20.0" },
        { price: "5.98" }
    ];

    const result = sortSubscriptions(subs, "hi");
    expect(result[0].price).toBe("20.0");
    expect(result[1].price).toBe("12.3");
    expect(result[2].price).toBe("5.98");
    });

// 4
// Testing sorting function: By price low-high
test('expect new list by price from low to high', () => {
    const subs = [
        { price: "12.3" },
        { price: "20.0" },
        { price: "5.98" }
    ];

    const result = sortSubscriptions(subs, "lo");
    expect(result[0].price).toBe("5.98");
    expect(result[1].price).toBe("12.3");
    expect(result[2].price).toBe("20.0");
    });

// 5
// Testing sorting function: By renewal date soonest-latest
test('expect new list by renewal date from soonest to latest', () => {
    const subs = [
        { renewal: "2026-08-27" },
        { renewal: "2026-05-01" },
        { renewal: "2025-12-03" }
    ];

    const result = sortSubscriptions(subs, "soonest");
    expect(result[0].renewal).toBe("2025-12-03");
    expect(result[1].renewal).toBe("2026-05-01");
    expect(result[2].renewal).toBe("2026-08-27");
    });

// 6
// Testing sorting function: By renewal date lastest-soonest
test('expect new list by renewal date from lastest to soonest ', () => {
    const subs = [
        { renewal: "2026-08-27" },
        { renewal: "2026-05-01" },
        { renewal: "2025-12-03" }
    ];

    const result = sortSubscriptions(subs, "latest");
    expect(result[0].renewal).toBe("2026-08-27");
    expect(result[1].renewal).toBe("2026-05-01");
    expect(result[2].renewal).toBe("2025-12-03");
    });

});




