const search = document.querySelector("form");
const card = document.querySelector(".information");
const infoCard = document.querySelector(".info-card");
const timeImg = document.querySelector(".weather-disp");
const icon = document.querySelector(".icon");
const searchIcon = document.querySelector("i");

//manipulate the dom
const updateUi = (data) => {
  const { cityData, weather } = data;
  // console.log(data);

  const temp = weather.Temperature.Metric.Value;

  let iconSrc = `/Assets/icons/${weather.WeatherIcon}.svg`;

  infoCard.innerHTML = `
    <div class="icon">
      <img src=${iconSrc} alt="" class="iconim">
    </div>
    <h5>${cityData.EnglishName}</h5>
    <div class="weather">${weather.WeatherText}</div>
    <div class="degree">
      <span>${temp}</span>
      <span>&deg;C</span>
    </div>
  `;

  // changes the image and icon to suit the time and weather condition

  let timeSrc = weather.IsDayTime ? "url(/Assets/day.jpg)" : "url(/Assets/night.jpg)";

  timeImg.style.backgroundImage = timeSrc;

  const computedStyle = window.getComputedStyle(card);

  if (computedStyle.display === "none") {
    card.classList.add("show");
  }
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

    //set local storage
    localStorage.setItem('city', city)
});

if (localStorage.getItem('city')) {
  updateCityUi(localStorage.getItem('city'))
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
}

//Input the search function on the search icon

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();

  //get the value of the city
  const city = search.city.value.trim();
  search.reset();

  //Inserts the city in the ui
  updateCityUi(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
});
