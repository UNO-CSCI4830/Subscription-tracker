const STORAGE_KEY = "subs_tracker_simple_v1";
let subs = [];
let editId = null;

const $ = (id) => document.getElementById(id);

const formEl = $("form");
const nameInput = $("nameInput");
const siteInput = $("siteInput");
const priceInput = $("priceInput");
const cycleInput = $("cycleInput");
const dateInput = $("dateInput");
const catInput = $("catInput");
const notesInput = $("notesInput");
const addBtn = $("addBtn");
const resetBtn = $("resetBtn");

const searchInput = $("searchInput");
const sortInput = $("sortInput");
const filterInput = $("filterInput");
const listEl = $("list");

const monthlyTotal = $("monthlyTotal");
const countText = $("countText");
const nextWhen = $("nextWhen");
const nextWhat = $("nextWhat");

const tabs = $("tabs");
const addPanel = $("addPanel");
const listPanel = $("listPanel");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

if (!dateInput.value) dateInput.value = todayISO();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    subs = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(subs)) subs = [];
  } catch (e) {
    subs = [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch (e) {}
}

function newId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function parseDate(iso) {
  const p = (iso || "").split("-").map(Number);
  return new Date(p[0], (p[1] || 1) - 1, p[2] || 1);
}

function daysLeft(iso) {
  const today = new Date();
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const d = parseDate(iso);
  const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}

function bucketColor(days) {
  if (days <= 7) return "soon";
  if (days <= 30) return "mid";
  return "good";
}

function money(n) {
  return Number(n || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

function pretty(d) {
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function monthlyEstimate(price, cycle) {
  price = Number(price || 0);
  if (cycle === "yearly") return price / 12;
  if (cycle === "weekly") return (price * 52) / 12;
  return price;
}

function favicon(site) {
  if (!site) return "";
  let host = site.trim().replace(/^https?:\/\//i, "");
  host = host.replace(/\/.*$/, "");
  if (!host) return "";
  return (
    "https://www.google.com/s2/favicons?domain=" +
    encodeURIComponent(host) +
    "&sz=64"
  );
}

function updateSummary() {
  const total = subs.reduce((sum, s) => sum + monthlyEstimate(s.price, s.cycle), 0);
  monthlyTotal.textContent = money(total);
  countText.textContent = subs.length + " subscription" + (subs.length === 1 ? "" : "s");

  if (!subs.length) {
    nextWhen.textContent = "—";
    nextWhat.textContent = "—";
    return;
  }

  const soonest = [...subs].sort((a, b) => parseDate(a.renewal) - parseDate(b.renewal))[0];
  const d = parseDate(soonest.renewal);
  const left = daysLeft(soonest.renewal);

  nextWhen.textContent = pretty(d);
  nextWhat.textContent = soonest.name + " • " + left + " day" + (left === 1 ? "" : "s") + " left";
}

function getView() {
  const q = (searchInput.value || "").trim().toLowerCase();

  let view = subs.filter((s) => {
    const hay = (s.name + " " + (s.category || "") + " " + (s.site || "")).toLowerCase();
    if (q && !hay.includes(q)) return false;

    const d = daysLeft(s.renewal);
    const b = bucketColor(d);

    if (filterInput.value === "soon" && b !== "soon") return false;
    if (filterInput.value === "mid" && b !== "mid") return false;
    if (filterInput.value === "long" && b !== "good") return false;

    return true;
  });

  view.sort((a, b) => {
    const aDue = parseDate(a.renewal).getTime();
    const bDue = parseDate(b.renewal).getTime();

    switch (sortInput.value) {
      case "soonest":
        return aDue - bDue;
      case "latest":
        return bDue - aDue;
      case "hi":
        return Number(b.price) - Number(a.price);
      case "lo":
        return Number(a.price) - Number(b.price);
      case "az":
        return a.name.localeCompare(b.name);
      case "za":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return view;
}

function render() {
  updateSummary();
  const view = getView();

  if (!view.length) {
    listEl.innerHTML = `<div class="empty">Nothing here yet. Add one on the left (or hit demo).</div>`;
    return;
  }

  listEl.innerHTML = "";

  view.forEach((s) => {
    const left = daysLeft(s.renewal);
    const b = bucketColor(left);
    const d = parseDate(s.renewal);

    const logo = s.site
      ? `<img src="${favicon(s.site)}" alt="" onerror="this.style.display='none'">`
      : "•";

    const div = document.createElement("div");
    div.className = "item " + b;

    div.innerHTML = `
      <div class="bar"></div>
      <div class="left">
        <div class="logo" title="${s.site || "No site"}">${logo}</div>
        <div style="min-width:0">
          <div class="name">${s.name}</div>
          <div class="meta">
            <span class="tag">${s.category || "Other"}</span>
            <span class="tag">${s.cycle}</span>
            <span class="tag">Due: ${pretty(d)}</span>
            <span class="tag">${left}d</span>
          </div>
          ${s.notes ? `<div class="note">${s.notes}</div>` : ""}
        </div>
      </div>
      <div class="right">
        <div class="price">${money(s.price)}</div>
        <div>
          <button class="small" data-action="edit" data-id="${s.id}">Edit</button>
          <button class="small danger" data-action="del" data-id="${s.id}">Delete</button>
        </div>
      </div>
    `;

    listEl.appendChild(div);
  });
}

function setTab(which) {
  const mobile = window.matchMedia("(max-width:880px)").matches;
  if (!mobile) return;

  tabs.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === which);
  });

  if (which === "add") {
    addPanel.classList.remove("hide");
    listPanel.classList.add("hide");
  } else {
    listPanel.classList.remove("hide");
    addPanel.classList.add("hide");
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const site = siteInput.value.trim();
  const price = priceInput.value;
  const cycle = cycleInput.value;
  const renewal = dateInput.value;
  const category = catInput.value;
  const notes = notesInput.value.trim();

  if (!name || !renewal || price === "") {
    alert("Fill out name, price, and renewal date.");
    return;
  }

  const obj = {
    id: editId || newId(),
    name,
    site,
    price: Number(price),
    cycle,
    renewal,
    category,
    notes,
  };

  if (editId) {
    const idx = subs.findIndex((x) => x.id === editId);
    if (idx !== -1) subs[idx] = obj;
    editId = null;
    addBtn.textContent = "Add";
  } else {
    subs.push(obj);
  }

  save();
  render();

  formEl.reset();
  dateInput.value = todayISO();
  setTab("list");
});

resetBtn.addEventListener("click", () => {
  editId = null;
  addBtn.textContent = "Add";
  formEl.reset();
  dateInput.value = todayISO();
});

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  const hit = subs.find((x) => x.id === id);
  if (!hit) return;

  if (action === "del") {
    if (confirm("Delete " + hit.name + "?")) {
      subs = subs.filter((x) => x.id !== id);
      save();
      render();
    }
  }

  if (action === "edit") {
    editId = id;
    nameInput.value = hit.name;
    siteInput.value = hit.site || "";
    priceInput.value = hit.price;
    cycleInput.value = hit.cycle;
    dateInput.value = hit.renewal;
    catInput.value = hit.category || "Other";
    notesInput.value = hit.notes || "";
    addBtn.textContent = "Save";
    setTab("add");
    nameInput.focus();
  }
});

[searchInput, sortInput, filterInput].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

tabs.addEventListener("click", (e) => {
  const b = e.target.closest(".tab");
  if (!b) return;
  setTab(b.dataset.tab);
});

window.addEventListener("resize", () => {
  const mobile = window.matchMedia("(max-width:880px)").matches;
  if (!mobile) {
    addPanel.classList.remove("hide");
    listPanel.classList.remove("hide");
  } else {
    const active = tabs.querySelector(".tab.active")?.dataset.tab || "add";
    setTab(active);
  }
});

load();
render();
setTab("add");

module.exports = {
  parseDate,
  daysLeft,
  bucketColor,
  monthlyEstimate,
};
