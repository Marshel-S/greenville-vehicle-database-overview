const params = new URLSearchParams(window.location.search);
const placeId = params.get("id");
const name = params.get("name");
const category = params.get("category");

async function loadDetails() {
  const root = document.getElementById("maps-details-root");

  root.innerHTML = `
    <div class="loading">
      <p>Loading Map Details...</p>
    </div>
  `;

  const loadingEl = document.querySelector(".loading");

  try {
    const res = await fetch(`/api/maps/${placeId}`);

    loadingEl.classList.add("slow");

    if (!res.ok) {
      throw new Error("Data tidak ditemukan");
    }

    const maps = await res.json();

    loadingEl.classList.add("done");

    setTimeout(() => {

    root.innerHTML = `
    <div class="maps-details-container">
        <div class="left-maps">
            <div class="map-images">
                <div class="back-button">
                    <button onclick="goMaps()">Return</button>
                </div>
                <h1>${maps.place_name}</h1>
                <img src="${maps.place_image}" alt="">
            </div>

            <h2>Location Overview</h2>
            <div class="paragraph-card">
                <p></p>
            </div>

            <h2>Layout</h2>
            <div class="paragraph-card">
                <p></p>
            </div>

            <h2>Exterior</h2>
            <div class="paragraph-card" id="ext-container"></div>

            <h2>Interior</h2>
            <div class="paragraph-card" id="int-container"></div>
        </div>

        <div class="right-maps">
            <div class="maps-overview">
                <table class="overview">
                    <thead>
                        <tr>
                            <th>${maps.place_name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Location:</strong> ${maps.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Use(s):</strong> ${maps.uses}</td>
                        </tr>
                    </tbody>
                </table>

                <br><br>
                <h1>Location Reference:</h1>
                <p>${maps.location_ref}</p>

                ${maps.location_link_ref 
                ? `<iframe 
                        class="gmaps"
                        src="${maps.location_link_ref}"
                        width="600"
                        height="450"
                        style="border:0;"
                        loading="lazy">
                    </iframe>`
                : `<br><p style="text-align: center; font-size: 26px;"><s style="text-decoration-color: red;">No Maps Available!</s></p>`
                }
            </div>
        </div>
    </div>
    `;

    const extContainer = document.getElementById("ext-container");
    if (Array.isArray(maps.place_ext)) {
      maps.place_ext.forEach(img => {
        extContainer.innerHTML += `<img src="${img}" alt="">`;
      });
    }

    const intContainer = document.getElementById("int-container");
    if (Array.isArray(maps.place_int)) {
      maps.place_int.forEach(img => {
        intContainer.innerHTML += `<img src="${img}" alt="">`;
      });
    }

  }, 300);

  } catch (err) {
    console.error("Error load details:", err);
    root.innerHTML = `<h2>Data tidak ditemukan</h2>`;
  }
}

function goMaps() {
  window.location.href = "/maps";
}

loadDetails();