const search = document.querySelector("form");
const card = document.querySelector(".information");
const infoCard = document.querySelector(".info-card");
const timeImg = document.querySelector('.weather-disp');

//manipulate the dom
const updateUi = (data) => {
  const { cityData, weather } = data;
  console.log(data);

  const temp = weather.Temperature.Metric.Value;

  infoCard.innerHTML = `
    <div class="icon">
            <!-- icon -->
          </div>
          <h5>${cityData.EnglishName}</h5>
          <div class="weather">${weather.WeatherText}</div>
          <div class="degree">
            <span>${temp}</span>
            <span>&deg;C</span>
          </div>
  `;

  let timeSrc = null;

  if (weather.IsDayTime) {
    timeSrc = 'url(/Assets/day.jpg)';
  } else {
    timeSrc = 'url(/Assets/night.jpg)';
  };

  timeImg.style.backgroundImage = timeSrc;



  // if (card.style.display === "none") {
  //   card.style.display = "block";
  // }



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


// console.log(timeImg.style);