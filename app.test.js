/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

function loadAppWithFreshDom() {
  const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
  document.documentElement.innerHTML = html;

  global.alert = jest.fn();
  global.confirm = jest.fn(() => true);

  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };

  jest.resetModules();
  require("./app.js");
}

function fillForm({
  name = "Spotify",
  site = "spotify.com",
  price = "9.99",
  cycle = "monthly",
  renewal = "2026-05-01",
  category = "Music",
  notes = "student plan",
} = {}) {
  document.getElementById("nameInput").value = name;
  document.getElementById("siteInput").value = site;
  document.getElementById("priceInput").value = price;
  document.getElementById("cycleInput").value = cycle;
  document.getElementById("dateInput").value = renewal;
  document.getElementById("catInput").value = category;
  document.getElementById("notesInput").value = notes;
}

describe("SubTracked add/edit/delete tests", () => {
  beforeEach(() => {
    localStorage.clear();
    loadAppWithFreshDom();
  });

  test("adds a new subscription when the form is submitted", () => {
    fillForm();

    document
      .getElementById("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    const saved = JSON.parse(localStorage.getItem("subs_tracker_simple_v1"));

    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      name: "Spotify",
      site: "spotify.com",
      price: 9.99,
      cycle: "monthly",
      renewal: "2026-05-01",
      category: "Music",
      notes: "student plan",
    });

    expect(document.getElementById("list").textContent).toContain("Spotify");
  });

  test("clicking Edit loads the selected subscription into the form", () => {
    localStorage.setItem(
      "subs_tracker_simple_v1",
      JSON.stringify([
        {
          id: "abc123",
          name: "Netflix",
          site: "netflix.com",
          price: 15.99,
          cycle: "monthly",
          renewal: "2026-05-10",
          category: "Streaming",
          notes: "family plan",
        },
      ])
    );

    loadAppWithFreshDom();

    document.querySelector('[data-action="edit"]').click();

    expect(document.getElementById("nameInput").value).toBe("Netflix");
    expect(document.getElementById("siteInput").value).toBe("netflix.com");
    expect(document.getElementById("priceInput").value).toBe("15.99");
    expect(document.getElementById("cycleInput").value).toBe("monthly");
    expect(document.getElementById("dateInput").value).toBe("2026-05-10");
    expect(document.getElementById("catInput").value).toBe("Streaming");
    expect(document.getElementById("notesInput").value).toBe("family plan");
    expect(document.getElementById("addBtn").textContent).toBe("Save");
  });

  test("submitting after editing updates the existing subscription", () => {
    localStorage.setItem(
      "subs_tracker_simple_v1",
      JSON.stringify([
        {
          id: "abc123",
          name: "Netflix",
          site: "netflix.com",
          price: 15.99,
          cycle: "monthly",
          renewal: "2026-05-10",
          category: "Streaming",
          notes: "family plan",
        },
      ])
    );

    loadAppWithFreshDom();

    document.querySelector('[data-action="edit"]').click();

    document.getElementById("nameInput").value = "Netflix Premium";
    document.getElementById("priceInput").value = "19.99";

    document
      .getElementById("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    const saved = JSON.parse(localStorage.getItem("subs_tracker_simple_v1"));

    expect(saved).toHaveLength(1);
    expect(saved[0].name).toBe("Netflix Premium");
    expect(saved[0].price).toBe(19.99);
    expect(document.getElementById("list").textContent).toContain("Netflix Premium");
  });

  test("clicking Delete removes the selected subscription when confirmed", () => {
    localStorage.setItem(
      "subs_tracker_simple_v1",
      JSON.stringify([
        {
          id: "abc123",
          name: "Netflix",
          site: "netflix.com",
          price: 15.99,
          cycle: "monthly",
          renewal: "2026-05-10",
          category: "Streaming",
          notes: "family plan",
        },
      ])
    );

    loadAppWithFreshDom();

    document.querySelector('[data-action="del"]').click();

    const saved = JSON.parse(localStorage.getItem("subs_tracker_simple_v1"));

    expect(confirm).toHaveBeenCalledWith("Delete Netflix?");
    expect(saved).toHaveLength(0);
    expect(document.getElementById("list").textContent).toContain("Nothing here yet");
  });
});
