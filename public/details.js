const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const name = params.get("name");
const category = params.get("category");

const app = document.getElementById("app");

async function loadCar() {

  app.innerHTML = "<center><p>Loading...</p></center>";
  if (!id) {
    app.innerHTML = "<h2>ID tidak ditemukan</h2>";
    return;
  }

  try {
    const res = await fetch(`/api/vehicles/${id}`);

    if (!res.ok) {
      throw new Error("Data tidak ditemukan");
    }

    const car = await res.json();

    renderCar(car);

  } catch (err) {
    console.error(err);
    app.innerHTML = "<h2>Data mobil tidak ditemukan 😢</h2>";
  }
}

function renderCar(car) {
  let colors = [];

  try {
    if (typeof car.colors === "string") {
      colors = JSON.parse(car.colors);
    } else if (Array.isArray(car.colors)) {
      colors = car.colors;
    }
  } catch {
    colors = [];
  }

  app.innerHTML = `

    <title>${car.car_name}</title>

    <div class="details-container">
      
      <div class="left-car-details">
      <div class="back-button"><button onclick="goVehicle()">Return</button></div>
      <h1 class="car-name">${car.car_name}</h1>
        <img id="carImage" src="${car.image}" alt="${car.car_name}" />

        <h2>Specification</h2>

        <div class="specs">
          <p><strong>Top Speed:</strong><br> ${car.topSpeed} km/h</p>
          <p><strong>Category:</strong><br> ${car.category}</p>
          <p><strong>Fuel:</strong><br> ${car.fuel}</p>
        </div>
      </div>

      <div class="right-car-details">
        <h3>Choose Color</h3>

        <div class="colors">
          ${
            colors.length > 0
              ? colors.map(color => `
                <div 
                  class="color-box"
                  style="background:${color}"
                  onclick="changeColor('${color}')"
                ></div>
              `).join("")
              : "<p>Tidak ada warna tersedia</p>"
          }
        </div>
      </div>

    </div>
  `;
}

function changeColor(color) {
  const img = document.getElementById("carImage");
  if (!img) return;

  img.style.transition = "opacity 0.2s";
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = `/images/car-${color}.png`;
    img.style.opacity = 1;
  }, 200);
}

    function goVehicle() {
    window.location.href = "/vehicle";
    }

loadCar();