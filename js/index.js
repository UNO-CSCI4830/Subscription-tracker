  const _supabaseUrl = 'https://lnvmocbxmdfkaxrxmpqn.supabase.co';
  const _supabaseKey = 'sb_publishable_gVZEpmVuhZBt-V8NSaibYw_zaQPsmOb';
  const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseKey);
  const GUEST_STORAGE_KEY = "subtracked_guest_subscriptions";
  
  let subs = [];
  let editId = null;
  let currentUser = null;

  const $ = (id) => document.getElementById(id);

  // UI Elements
  const formEl = $("form"), nameInput = $("nameInput"), siteInput = $("siteInput");
  const priceInput = $("priceInput"), cycleInput = $("cycleInput"), dateInput = $("dateInput");
  const catInput = $("catInput"), notesInput = $("notesInput"), addBtn = $("addBtn"), resetBtn = $("resetBtn");
  const searchInput = $("searchInput"), sortInput = $("sortInput"), filterInput = $("filterInput");
  const listEl = $("list"), monthlyTotal = $("monthlyTotal"), countText = $("countText");
  const nextWhen = $("nextWhen"), nextWhat = $("nextWhat");
  const logoutBtn = $("logoutBtn"), loginBtn = $("loginBtn"), settingBtn = $("settingsBtn"),currentUserText = $("currentUserText");
  const tabs = $("tabs"), addPanel = $("addPanel"), listPanel = $("listPanel");

  // --- AUTH & LOADING ---

  // check if user logged in, and decide where to load data from. 
  async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    currentUser = user || null;
    refreshTopbar(currentUser);

    if (currentUser) {
      await fetchSubs();
    } else {
      loadGuestSubs();
    }
  }
  // If user logged in -- load data from supabase
  async function fetchSubs() {
    const { data, error } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('renewal', { ascending: true });

    if (error) console.error(error);
    else {
      subs = data;
      render();
    }
  }

  // Load guest data from local storage. 
  function loadGuestSubs() {
  try {
    subs = JSON.parse(localStorage.getItem(GUEST_STORAGE_KEY) || "[]");
  } catch {
    subs = [];
  }
  render();
  }

function saveGuestSubs() {
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(subs));
}

function makeGuestId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

// --- LOGIC HELPERS ---

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
if (!dateInput.value) dateInput.value = todayISO();

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

function money(n) { return Number(n || 0).toLocaleString(undefined, { style: "currency", currency: "USD" }); }
function pretty(d) { return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); }

function monthlyEstimate(price, cycle) {
  price = Number(price || 0);
  if (cycle === "yearly") return price / 12;
  if (cycle === "weekly") return (price * 52) / 12;
  return price;
}

function favicon(site) {
  if (!site) return "";
  let host = site.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(host) + "&sz=64";
}

// --- UI RENDERING ---

function updateSummary() {
  const total = subs.reduce((sum, s) => sum + monthlyEstimate(s.price, s.cycle), 0);
  monthlyTotal.textContent = money(total);
  countText.textContent = subs.length + " subscription" + (subs.length === 1 ? "" : "s");
  if (!subs.length) { nextWhen.textContent = "—"; nextWhat.textContent = "—"; return; }
  const soonest = [...subs].sort((a, b) => parseDate(a.renewal) - parseDate(b.renewal))[0];
  const d = parseDate(soonest.renewal);
  const left = daysLeft(soonest.renewal);
  nextWhen.textContent = pretty(d);
  nextWhat.textContent = soonest.name + " • " + left + " days left";
}

function getView() {
  const q = (searchInput.value || "").trim().toLowerCase();

  let view = subs.filter(s => {
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
      case "soonest": return aDue - bDue;
      case "latest":  return bDue - aDue;
      case "hi":      return Number(b.price) - Number(a.price);
      case "lo":      return Number(a.price) - Number(b.price);
      case "az":      return a.name.localeCompare(b.name);
      case "za":      return b.name.localeCompare(a.name);
    }
    return 0;
  });

return view;
}

function render() {
  updateSummary();
  const view = getView();

  if (!view.length) {
    listEl.innerHTML = `<div class="empty">Nothing here yet. Add one on the left.</div>`;
    return;
  }

  listEl.innerHTML = "";

  view.forEach(s => {
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

  // --- EVENT LISTENERS ---

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const obj = {
      name: nameInput.value,
      site: siteInput.value,
      price: Number(priceInput.value),
      cycle: cycleInput.value,
      renewal: dateInput.value,
      category: catInput.value,
      notes: notesInput.value
    };

    if (currentUser) {
      obj.user_id = currentUser.id;

      let error = null;

      if (editId) {
        const result = await supabaseClient
          .from('subscriptions')
          .update(obj)
          .eq('id', editId);

        error = result.error;
        editId = null;
        addBtn.textContent = "Add";
  } else {
    const result = await supabaseClient
      .from('subscriptions')
      .insert([obj]);

    error = result.error;
  }

  if (error) {
    console.error("Supabase error:", error);
    alert(error.message);
    return;
  }

  await fetchSubs();
} else {
      if (editId) {
        subs = subs.map(s => s.id == editId ? { ...s, ...obj, id: editId } : s);
        editId = null;
        addBtn.textContent = "Add";
      } else {
        subs.push({ ...obj, id: makeGuestId() });
      }

      saveGuestSubs();
      render();
    }

    formEl.reset();
    dateInput.value = todayISO();
  });

  listEl.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === "del" && confirm("Delete?")) {
      if (currentUser) {
        await supabaseClient.from('subscriptions').delete().eq('id', id);
        await fetchSubs();
      } else {
        subs = subs.filter(x => x.id != id);
        saveGuestSubs();
        render();
      }
    } else if (action === "edit") {
      const hit = subs.find(x => x.id == id);
      if (!hit) return;

      editId = id;
      nameInput.value = hit.name || "";
      siteInput.value = hit.site || "";
      priceInput.value = hit.price ?? "";
      cycleInput.value = hit.cycle || "monthly";
      dateInput.value = hit.renewal || "";
      catInput.value = hit.category || "Other";
      notesInput.value = hit.notes || "";
      addBtn.textContent = "Save";
    }
  });

  resetBtn.addEventListener("click", () => {
    editId = null;
    addBtn.textContent = "Add";
    formEl.reset();
    dateInput.value = todayISO();
  });

  [searchInput, sortInput, filterInput].forEach(el => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
  });

  logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();

    currentUser = null;
    editId = null;

    formEl.reset();
    addBtn.textContent = "Add";

    refreshTopbar(null);
    loadGuestSubs();
  });

  loginBtn.addEventListener("click", () => {
    window.location.href = "login_screen.html";
  });

  settingsBtn.addEventListener("click", () => {
  window.location.href = "settings.html";
  });

function refreshTopbar(user) {
if (user) {
  const displayName =
    user.user_metadata?.first_name && user.user_metadata?.last_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : (user.email || "User");

  currentUserText.textContent = displayName;
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  //added 'settings' (no setting UI display in guest mode)
  if (settingBtn) settingBtn.style.display = "inline-block";

} else {
  currentUserText.textContent = "Guest mode";
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  if (settingBtn) settingBtn.style.display = "none";
}
}

checkUser(); // Kick off the process
