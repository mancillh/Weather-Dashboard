const APIKey = "cfd839927ae8a3a54571499306de4d74";
const cityFormEl = $('#city-form');
const dailyWeatherForecastCardEl = $('#card');
const fetchButton = document.getElementById('fetch-button');
const previousLocationList = document.querySelector('ul');
const biggestDisplay = document.querySelector('.biggestDisplay');

// Finds latitude and longitude from user's city input
function findCoordinates (event) {
  event.preventDefault();

  const cityInputVal = document.querySelector('#city-input').value;

  if (!cityInputVal) {
    console.error('Please type a city name into the search bar!');
    return;
  } else {
    let city = cityInputVal;
    let geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
    fetch(geocodingURL)
      .then(function (response) {
        return response.json();
      })
    .then (function (data) {
      for (let i = 0; i < data.length; i++) {
          const listCity = document.getElementById('card-title');
          let date = new Date().toLocaleDateString();
          listCity.textContent = data[0].name + " (" + date + ")";
          localStorage.setItem('latitude',JSON.stringify(data[0].lat));
          localStorage.setItem('longitude',JSON.stringify(data[0].lon));
        }
      });
  }
};

// Pushes latitude and longitude from findCoordinates function into Open Weather Map query and produces the 5 day forecast
function getApi() {
  let latitude = JSON.parse(localStorage.getItem('latitude'));
  let longitude = JSON.parse(localStorage.getItem('longitude'));
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=5&appid=${APIKey}&units=imperial`;
  
  fetch(queryURL) 
    .then(function (response) {
        return response.json();
    })
    .then (function (data) { 
      document.getElementById("card-title-1").textContent = data.list[1].dt_txt;
      document.getElementById("temp-text-1").textContent = "Temp: " + data.list[1].main.temp;
      document.getElementById("wind-text-1").textContent = "Wind: " + data.list[1].wind.speed;
      document.getElementById("humidity-text-1").textContent = "Humidity: " + data.list[1].main.humidity;
      // localStorage.setItem('iconCode',JSON.stringify(data.list[1].weather[0].icon));
      // getIcon();
      const img = document.getElementById("icon-1");
      let iconCode = data.list[1].weather[0].icon;
      img.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    });
  };
//   const cardTemp = $('<p>').addClass('card-text').text("Temp: " + data.list[i].main.temp);
//   const cardWind = $('<p>').addClass('card-text').text("Wind: " + data.list[i].wind.speed);
//   const cardHumidity = $('<p>').addClass('card-text').text("Hunidity: " + data.list[i].main.humidity);

//   // Return the card.
//   return dailyForecastCard;
// };
// // const listItem = document.createElement('li');
// // listItem.textContent = data[i].html_url;
// // previousLocationList.appendChild(listItem);
getApi();

// function getIcon () {
//   let iconCode = JSON.parse(localStorage.getItem('iconCode'));
//   const iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//   console.log(iconLink);
  // fetch(iconLink) 
  //   .then(function (response) {
  //   return response.json();
  //   })
  //   .then (function (data) { 
  //     localStorage.setItem('iconImg',JSON.stringify(data));
  //   });
  // };