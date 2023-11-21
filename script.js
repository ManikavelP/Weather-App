let inputText = document.querySelector(".search-input");
let searchBtn = document.getElementById("search-btn");
let weatherImage = document.querySelector(".weather-image");
let description = document.querySelector(".desc");
let temperature = document.querySelector(".temp");
let humidity = document.getElementById("weather-humidity");
let windSpeed = document.getElementById("weather-wind");
let locationNotFound = document.querySelector('.Location-not');

let weatherBody = document.querySelector('.weather-body')
if(inputText.value == ""){

}
inputText.addEventListener("keyup", function(event) {
  if (event.key === "Enter" && inputText.value !== "") {
    checkWeather(inputText.value);
  }
});
searchBtn.addEventListener("click", () => {
  checkWeather(inputText.value);
});
async function checkWeather(city) {


  if (city ==""){
    weatherBody.style.display = "none";
    locationNotFound.style.display = "flex";
  }
  let myApiKey = "39a107a34b9ffd42b9cf5411e42f3733";
  let apiCallUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}`;

  let weatherData = await fetch(`${apiCallUrl}`).then((response) =>
    response.json()
  );

  if(weatherData.cod ==='404'){
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none"

    console.log('error');
    return;
  }
  locationNotFound.style.display = "none"
  

  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.wea}`;

  

  humidity.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}km/H`;

  description.innerHTML = `${weatherData.weather[0].description}`;

  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImage.src =isDayTime() ?'/assets/cloud.png': '/assets/night_cloudy.jpg';
      break;
    
    case "Clear":
      weatherImage.src =isDayTime() ? "/assets/clear.png":'/assets/night_clear1.png';
      break;
    case "Rain" || "Light Rain":
      weatherImage.src = isDayTime() ?"/assets/rain.png":'/assets/night_rainy.png';
      break;
    case "Thunderstorm":
      weatherImage.src =isDayTime() ? '/assets/thunder.png':'/assets/night_thunder.jpg';
      break;
    case 'Foggy':
      weatherImage.src =isDayTime() ? '/assets/cloud.png':'/assets/night_cloudy.jpg';
      break;
    case 'Mist':
      weatherImage.src=isDayTime() ?"/assets/mist.png":'/assets/night_mist.webp';
      break;

  
  }
  weatherBody.style.display = "flex";

  function isDayTime() {
    let currentTime = new Date().getHours();
    return currentTime >= 6 && currentTime < 18;
  }
}



