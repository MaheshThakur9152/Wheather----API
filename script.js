const apiKey = "441bacdaf7ed2619e64c4a6a8c3809e5";
const cardContainer = document.getElementById("card-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");


const defaultCities = ["London", "Paris"];


async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert(`City "${city}" not found`);
      return null;
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    alert("Error fetching weather");
    return null;
  }
}


function createCard(data) {
  const unique = Date.now(); 
  const card = document.createElement("div");
  card.classList.add("col-md-4", "col-sm-6", "mb-3");
  card.innerHTML = `
    <div class="card text-center shadow-lg border-0">
      <div class="card-body">
        <h4 class="card-title mb-3">Weather in <span>${data.name}</span></h4>
        <h1 class="display-4 fw-bold">${Math.round(data.main.temp)}°C</h1>
        <p class="lead text-muted mb-3">${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="100">
        <div class="d-flex justify-content-around">
          <p class="mb-0">Humidity: ${data.main.humidity}%</p>
          <p class="mb-0">Wind: ${data.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  `;
  cardContainer.appendChild(card);
}


defaultCities.forEach(async city => {
  const data = await fetchWeather(city);
  if (data) createCard(data);
});

searchForm.addEventListener("submit", async e => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (!city) return;
  const data = await fetchWeather(city);
  if (data) createCard(data);
  searchInput.value = "";
});
