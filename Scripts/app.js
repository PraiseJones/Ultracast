const search = document.querySelector("form");
const card = document.querySelector(".information");
const infoCard = document.querySelector(".info-card");

//manipulate the dom
const updateUi = (data) => {
  const cityData = data.cityData;
  const weatherData = data.weather;
  const temp = weatherData.Temperature.Metric.Value;

  infoCard.innerHTML = `
    <div class="icon">
            <!-- icon -->
          </div>
          <h5>${cityData.EnglishName}</h5>
          <div class="weather">${weatherData.WeatherText}</div>
          <div class="degree">
            <span>${temp}</span>
            <span>&deg;C</span>
          </div>
    `;

  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden');
  };
};

const updateCityUi = async (city) => {
  const cityData = await getCity(city);
  const weather = await getWeather(cityData.Key);

  return {
    cityData,
    weather,
  };
};

search.addEventListener("submit", (e) => {
  e.preventDefault();

  //get the value of the city
  const city = search.city.value.trim();
  search.reset();

  //Inserts the city in the ui
  updateCityUi(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
});
