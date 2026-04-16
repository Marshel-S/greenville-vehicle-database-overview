// ======================
// GLOBAL DATA
// ======================
let vehicles = [];

// ======================
// ELEMENT
// ======================
const brandEl = document.getElementById("brand");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const fuelEl = document.getElementById("fuel");
const priceEl = document.getElementById("price");
const priceValueEl = document.getElementById("priceValue");
const applyBtn = document.getElementById("apply");
const sortEl = document.getElementById("sort");

async function loadVehicles() {
  try {
    const res = await fetch("/api/vehicles");
    vehicles = await res.json();

    console.log("DATA:", vehicles);

    renderVehicles(vehicles);
    populateFilters(vehicles);
    updatePriceLabel();

  } catch (err) {
    console.error("ERROR LOAD:", err);
  }
}

function getUniqueValues(data, key) {
  return [...new Set(data.map(item => item[key]))];
}

function populateSelect(selectId, values) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = `<option value="all">All</option>`;

  values.forEach(val => {
    select.innerHTML += `<option value="${val}">${val}</option>`;
  });
}

function populateFilters(vehicles) {
  populateSelect("brand", getUniqueValues(vehicles, "brand"));
  populateSelect("type", getUniqueValues(vehicles, "type"));
  populateSelect("category", getUniqueValues(vehicles, "category"));
  populateSelect("fuel", getUniqueValues(vehicles, "fuel"));
}

function filterVehicles() {
  console.log("FILTER JALAN");

  const brand = brandEl.value;
  const type = typeEl.value;
  const category = categoryEl.value;
  const fuel = fuelEl.value;
  const maxPrice = Number(priceEl.value);

  let filtered = vehicles.filter(v => {
    return (
      (brand === "all" || v.brand === brand) &&
      (type === "all" || v.type === type) &&
      (category === "all" || v.category === category) &&
      (fuel === "all" || v.fuel === fuel) &&
      v.price <= maxPrice
    );
  });

  if (sortEl) {
    const sortValue = sortEl.value;

    if (sortValue === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  renderVehicles(filtered);
}

function renderVehicles(data) {
  const container = document.getElementById("vehicle-list");

  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = `<p class="loading">No vehicles found</p>`;
    return;
  }

  container.innerHTML = data.map(v => `
    <div class="card">
      <h2>${v.car_name}</h2>
        <p>$${v.price}</p>
        <span>Top Speed: ${v.topSpeed} MPH</span>
        <img src="${v.image || '/images/default.jpg'}" loading="lazy" />
        <a href="/details?id=${v.id}+name=${encodeURIComponent(v.car_name)}+category=${v.category}" class="overlay-text">
          View Details
        </a>
    </div>
  `).join("");
}

function formatPrice(price) {
  return price;
}

function updatePriceLabel() {
  if (priceValueEl && priceEl) {
    priceValueEl.innerText = "$" + formatPrice(priceEl.value);
  }
}

if (applyBtn) {
  applyBtn.addEventListener("click", filterVehicles);
}

if (priceEl) {
  priceEl.addEventListener("input", updatePriceLabel);
}

document.addEventListener("DOMContentLoaded", loadVehicles);