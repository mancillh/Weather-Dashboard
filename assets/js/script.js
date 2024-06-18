const APIKey = "cfd839927ae8a3a54571499306de4d74";
const cityFormEl = $('#city-form');
const dailyWeatherForecastCardEl = $('#card');
const fetchButton = document.getElementById('fetch-button');
const previousLocationList = document.querySelector('ul');
const biggestDisplay = document.querySelector('.biggestDisplay');

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
          console.log("latitude = " + data[0].lat); 
          console.log("longitude = " + data[0].lon);
          const listCity = document.createElement('p');
          listCity.textContent = data[0].name;
          biggestDisplay.appendChild(listCity);
          return data[0].lat && data[0].lon;
        }
      
      getApi();
      });
  }
};

function getApi() {
  const queryURL = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${APIKey}`;

  fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        for (let i = 0; i < data.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = data[i].html_url;
            previousLocationList.appendChild(listItem);
          }
        console.log(data);
    });
}

// fetchButton.addEventListener('click', getApi);

// // Reads tasks from local storage and returns array of task objects.
// // If there are no tasks in localStorage, it initializes an empty array ([]) and returns it.
// function readCoordinatesFromStorage() {
//   let coordinates = JSON.parse(localStorage.getItem('coordinates'));

//   // If no tasks were retrieved from localStorage, assign tasks to a new empty array to push to later.
//   if (!coordinates) {
//     coordinates = [];
//   }

//   // Return the tasks array either empty or with data in it 
//   return coordinates;
// };

// // Accepts an array of weather information, stringifys them, and saves them in localStorage.
// function saveCoordinatesToStorage(coordinates) {
//   localStorage.setItem('coordinates', JSON.stringify(coordinates));
// };

// function readWeatherDataFromStorage() {
//     let data = JSON.parse(localStorage.getItem('data'));
  
//     // If no tasks were retrieved from localStorage, assign tasks to a new empty array to push to later.
//     if (!data) {
//       data = [];
//     }
  
//     // Return the tasks array either empty or with data in it 
//     return data;
//   };
  
//   // Accepts an array of weather information, stringifys them, and saves them in localStorage.
//   function saveWeatherDataToStorage(data) {
//     localStorage.setItem('data', JSON.stringify(data));
//   };

// //function to create a daily forecast card
// function createDailyForecastCard() {
//   const dailyForeceastCard = $('<div>')
//     .addClass('card task-card my-3')
//   const cardHeader = $('<div>').addClass('card-header h4').text(forecast.date);
//   const cardBody = $('<div>').addClass('card-body');
//   const cardIcon = $('<p>').addClass('card-text').text(forecast.icon);
//   const cardTemp = $('<p>').addClass('card-text').text(forecast.temp);
//   const cardWind = $('<p>').addClass('card-text').text(forecast.wind);
//   const cardHumidity = $('<p>').addClass('card-text').text(forecast.humidity);

//   //Gather all the elements created above and append them to the correct elements.
//   cardBody.append(cardIcon, cardTemp, cardWind, cardHumidity);
//   dailyForeceastCard.append(cardHeader, cardBody);

//   // Return the card.
//   return taskCard;
// }

// // function to render the task list and make cards draggable
// function renderTaskData() {
//   const tasks = readTasksFromStorage();

//   //Empty existing task cards out of the lanes
//   const todoList = $('#todo-cards');
//   todoList.empty();

//   const inProgressList = $('#in-progress-cards');
//   inProgressList.empty();

//   const doneList = $('#done-cards');
//   doneList.empty();

//   //Loop through tasks and create task cards for each status
//   for (task of tasks) {
//     if (task.status === 'to-do') {
//       todoList.append(createTaskCard(task));
//     } else if (task.status === 'in-progress') {
//       inProgressList.append(createTaskCard(task));
//     } else if (task.status === 'done') {
//       doneList.append(createTaskCard(task));
//     }
//   }

// // save the tasks to localStorage
// let tasks = JSON.parse(localStorage.getItem('tasks'));
// saveTasksToStorage(tasks);

// // Render task data back to screen
// renderTaskData();

// // function to handle adding a new task
// function cityEntered(event) {
//   event.preventDefault();

//   // Read user input from form  
//   const city = cityFormEl.val().trim();
  
//   const newCity = {
//     //date: city,
//     icon: data.weather[0].icon,
//     temp: data.main.temp,
//     wind: data.wind.speed,
//     humidity: data.main.humidity,
//   };

//   // Pull the tasks from localStorage and push the new task to the array
//   const tasks = readWeatherDataFromStorage();
//   city.push(newCity);

//   // Save the updated tasks array to localStorage
//   saveWeatherDataToStorage();

//   // Render task data back to the screen
//   renderForecastData();

//   // Clear the form inputs
//   cityFormEl.val('');
// };

// // const listItem = document.createElement('li');
// // listItem.textContent = data[i].html_url;
// // previousLocationList.appendChild(listItem);