const APIKey = "cfd839927ae8a3a54571499306de4d74";
const searchButton = document.getElementById('city-form');
const previousLocationList = document.querySelector('ul');
const biggestDisplay = document.querySelector('.biggestDisplay');
const cityInputVal = document.querySelector('#city-input');

// Finds latitude and longitude from user's city input
function findCoordinates (event) {
  // prevents page from reloading when user clicks search button
  event.preventDefault();

  // assigns the variable city to the value from the form (what the user enters as their search)
  let city = cityInputVal.value 
  // URL to determine longitude and latitude (via Open Weather API) based on user's search input 
  let geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
  
  //fetches longitude and latitude from Open Weather API to pass to getApi function and passes the city name to 
  //the getApi and addPreviousLocationToList functions
  fetch(geocodingURL)
    .then(function (response) {
        return response.json();
      })
    .then (function (data) {
      getApi(data[0].name, data[0].lat, data[0].lon);
      addPreviousLocationToList(data[0].name);
      })
  };

// Function to add recently searched cities to a list below search bar, also makes each city name a button
function addPreviousLocationToList (name) {
    // Creates button
    const previousLocationBtn = document.createElement('button');

    // Assigns most recently searched city to the button
    previousLocationBtn.className ='btn previousLocationBtn';

    // Displays the city name
    previousLocationBtn.textContent = name;

    // Adds the city name to a list
    previousLocationList.append(previousLocationBtn);
    
    // Listens for click of one of the grey buttons listed below the search bar, provides name of the city (from 
    //text on button) to findCoordinatesOfPreviousCity function
    previousLocationBtn.addEventListener('click', event => {
      const btn = event.target.closest("button");
      findCoordinatesOfPreviousCity(`${btn.textContent}`);
    });
};

// Function to find latitude and longitude from city name that appears on previous location button. This function 
//is nearly identical to the findCoordinates function but activates when the user clicks a button for a recently 
//searched city instead of from submission of form
function findCoordinatesOfPreviousCity (previousLocationBtnText) {
  // Asigns city variable as text on button
  let city = previousLocationBtnText;
  // URL to determine longitude and latitude (via Open Weather API) based on button text 
  let geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
  
  //fetches longitude and latitude from Open Weather API to pass to getApi function and passes the city name to 
  //the getApi function. Note: the addPreviousLocationToList function is intentionally not called here to prevent
  //duplicate grey previously searched buttons
  fetch(geocodingURL)
    .then(function (response) {
        return response.json();
      })
    .then (function (data) {
      getApi(data[0].name, data[0].lat, data[0].lon);
      })
  };

// Pushes name, latitude and longitude from findCoordinates and findCoordinatesOfPreviousCity functiosn into Open 
//Weather API query and produces the 5 day forecast
function getApi(name, lat, lon) {
  // URL to get 5 day forecast, NOTE: added query for imperial units
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
  
  //fetches 5 day forecast from Open Weather API and passes city name to the biggest card and the following to all 
  //weather forecast cards: date, temperature, wind speed, humidity, and an icon to represent the weather. NOTE:
  //dates must be converted from UTC epoch time (multiply by 1000) and formatted as MM/DD/YYYY using 
  //toLocaleDateString. Units must be added as string. Icons retrieved were 2x the intended size and needed to be
  //modified to remove @2x from URL. Icons were sourced from Open Weather API and retrieved from icon code provided
  //in data array returned by the API fetch
  fetch(queryURL) 
    .then(function (response) {
        return response.json();
    })
    .then (function (data) { 
      document.getElementById("card-title").textContent = name + " " + "(" + new Date(data.list[0].dt*1000).toLocaleDateString() + ")";
      document.getElementById("temp-text").textContent = "Temp: " + data.list[0].main.temp + " °F";
      document.getElementById("wind-text").textContent = "Wind: " + data.list[0].wind.speed + " MPH";
      document.getElementById("humidity-text").textContent = "Humidity: " + data.list[0].main.humidity + " %";
      const img = document.getElementById("icon");
      let iconCode = data.list[0].weather[0].icon;
      img.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode}.png`);

      document.getElementById("card-title-1").textContent = new Date(data.list[8].dt*1000).toLocaleDateString();
      document.getElementById("temp-text-1").textContent = "Temp: " + data.list[8].main.temp + " °F";
      document.getElementById("wind-text-1").textContent = "Wind: " + data.list[8].wind.speed + " MPH";
      document.getElementById("humidity-text-1").textContent = "Humidity: " + data.list[8].main.humidity + " %";
      const img1 = document.getElementById("icon-1");
      let iconCode1 = data.list[8].weather[0].icon;
      img1.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode1}.png`);

      document.getElementById("card-title-2").textContent = new Date(data.list[16].dt*1000).toLocaleDateString();
      document.getElementById("temp-text-2").textContent = "Temp: " + data.list[16].main.temp + " °F";
      document.getElementById("wind-text-2").textContent = "Wind: " + data.list[16].wind.speed + " MPH";
      document.getElementById("humidity-text-2").textContent = "Humidity: " + data.list[16].main.humidity + " %";
      const img2 = document.getElementById("icon-2");
      let iconCode2 = data.list[16].weather[0].icon;
      img2.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode2}.png`);

      document.getElementById("card-title-3").textContent = new Date(data.list[24].dt*1000).toLocaleDateString();
      document.getElementById("temp-text-3").textContent = "Temp: " + data.list[24].main.temp + " °F";
      document.getElementById("wind-text-3").textContent = "Wind: " + data.list[24].wind.speed + " MPH";
      document.getElementById("humidity-text-3").textContent = "Humidity: " + data.list[24].main.humidity + " %";
      const img3 = document.getElementById("icon-3");
      let iconCode3 = data.list[24].weather[0].icon;
      img3.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode3}.png`);

      document.getElementById("card-title-4").textContent = new Date(data.list[32].dt*1000).toLocaleDateString();
      document.getElementById("temp-text-4").textContent = "Temp: " + data.list[32].main.temp + " °F";
      document.getElementById("wind-text-4").textContent = "Wind: " + data.list[32].wind.speed + " MPH";
      document.getElementById("humidity-text-4").textContent = "Humidity: " + data.list[32].main.humidity + " %";
      const img4 = document.getElementById("icon-4");
      let iconCode4 = data.list[32].weather[0].icon;
      img4.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode4}.png`);

      document.getElementById("card-title-5").textContent = new Date(data.list[39].dt*1000).toLocaleDateString();
      document.getElementById("temp-text-5").textContent = "Temp: " + data.list[39].main.temp + " °F";
      document.getElementById("wind-text-5").textContent = "Wind: " + data.list[39].wind.speed + " MPH";
      document.getElementById("humidity-text-5").textContent = "Humidity: " + data.list[39].main.humidity + " %";
      const img5 = document.getElementById("icon-5");
      let iconCode5 = data.list[39].weather[0].icon;
      img5.setAttribute('src',`https://openweathermap.org/img/wn/${iconCode5}.png`);

      // Clears search (form)
      document.getElementById("city-form").reset(); 
    });
  };

// Activates findCoordinates function on click of search button
searchButton.addEventListener('submit', findCoordinates);