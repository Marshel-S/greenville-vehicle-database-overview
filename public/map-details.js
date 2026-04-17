const params = new URLSearchParams(window.location.search);
const id = params.get("place_id");
const name = params.get("place_name");
const category = params.get("place_category");

const app = document.getElementById("app");

async function loadMaps() {

  app.innerHTML = `
  <div class="loading">
    <p>Loading Maps...</p>
  </div>
`;

  const loadingEl = document.querySelector(".loading");

  if (!id) {
    app.innerHTML = "<h2>ID tidak ditemukan</h2>";
    return;
  }

  try {
    const res = await fetch(`/api/maps/${id}`);

    loadingEl.classList.add("slow");

    if (!res.ok) {
      throw new Error("Data was not found");
    }

    const maps = await res.json();

    loadingEl.classList.add("done");

    setTimeout(() => {
      rendermaps(maps);
    }, 300);

  } catch (err) {
    console.error(err);
    app.innerHTML = "<h2>Maps was not found</h2>";
  }
}

function rendermaps(maps) {
  let colors = [];

  app.innerHTML = `

    <title>${maps.place_name}</title>

    <div class="maps-details-container">
        <div class="left-maps">
            <div class="map-images">
            <h1>${maps.place_name}</h1>
            <img src="${maps.image}" alt="${maps.place_name}">
            </div>
            <h2>Location Overview</h2>
            <div class="paragraph-card">
                <p></p>
            </div>
        </div>

        <div class="right-maps">
            <div class="maps-overview"></div>
        </div>
    </div>
  `;
}

function goVehicle() {
window.location.href = "/vehicle";
}

loadCar();