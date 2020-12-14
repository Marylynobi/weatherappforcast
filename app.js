//DATE AND TIME
  let now = new Date ();
  let currentDate= document.querySelector (".today"); 
    let date =now.getDate();
    let hours=now.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
        } else {`${hours}`}
    let year=now.getFullYear();
    let minutes=now.getMinutes()
        if (minutes < 10) {
        minutes = `0${minutes}`;
        } else {`${minutes}`}

    let days= ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[now.getDay()];

    let months=["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month=months[now.getMonth()];

    function change() {
    let today=`${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
    currentDate.innerHTML = today;
    }

    change();

  function formatHours(timestamp) {
    let now = new Date (timestamp);
    let hours=now.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
        } else {`${hours}`}
    let minutes=now.getMinutes()
     if (minutes < 10) {
        minutes = `0${minutes}`;
        } else {`${minutes}`}

    return`${hours}:${minutes}`;


  }
//FORM

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h2City = document.querySelector("#card-city");
  h2City.innerHTML = city;
  let h2Temp = document.querySelector(".temperaturevalue");
  h2Temp.innerHTML = temperature;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML= response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML= Math.round(response.data.wind.speed);
  let descriptionElement=document.querySelector ("#description");
  descriptionElement.innerHTML=response.data.weather[0].description;
  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  celsiusTemperature= response.data.main.temp;
}

function displayForecast (response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast= null;

  for (let index = 0; index < 6 ; index++) {
  forecast= response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2">
                <h5>${formatHours(forecast.dt * 1000)}</h5>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" ; id="icon" ; class="smallIcons" />
                <h5><span class="forecastMax">${Math.round(forecast.main.temp_max)}</span>° | <span class="forecastMin">${Math.round(forecast.main.temp_min)}</span>°</h5>
            </div>
  `;
}
}

function citySearch (event) {
  event.preventDefault ();
  let citySearchInput = document.querySelector("#exampleInputText");
  let h2City = document.querySelector("#card-city");
  h2City.innerHTML = `${citySearchInput.value}`;
  let apiKey = "b19a3f432de5f615851032aa1c827b12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#find-city");
form.addEventListener("submit", citySearch);

//CURRENT LOCATION
function searchLocation(position) {
  let apiKey = "b19a3f432de5f615851032aa1c827b12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

//FAHRENHEIT CELSIUS
let celsiusTemperature=null

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let newTempFahrenheit = document.querySelector(".temperaturevalue");
  newTempFahrenheit.innerHTML = Math.round(fahrenheitTemperature); 

  let fahrenheitForecastMax = document.querySelectorAll(".forecastMax");  fahrenheitForecastMax.forEach(function (item) {
  let currentTemp = item.innerHTML;    
  item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  let fahrenheitForecastMin = document.querySelectorAll(".forecastMin");  fahrenheitForecastMin.forEach(function (item) {
  let currentTemp = item.innerHTML;    
  item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

celsius.addEventListener("click", changeToCelsius);
fahrenheit.removeEventListener("click", changeToFahrenheit);
}


function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperaturevalue");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);  
  let celsiusForecastMax = document.querySelectorAll(".forecastMax");  
  celsiusForecastMax.forEach(function (item) {
  let currentTemp = item.innerHTML; 
  item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  
  let celsiusForecastMin = document.querySelectorAll(".forecastMin");  celsiusForecastMin.forEach(function (item) {
  let currentTemp = item.innerHTML;    
  item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  }); 

  celsius.removeEventListener("click", changeToCelsius);
  fahrenheit.addEventListener("click", changeToFahrenheit);
}


let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

//BACKGROUND
let background = document.querySelector(".container");
let iconElement = response.data.weather[0].main.toLowerCase();if(iconElement === "clear") {
  background.setAttribute("src", `sunny.jpg`);
} else if(iconElement === "light rain") {
  background.setAttribute("src", "rainy.jpg");
}