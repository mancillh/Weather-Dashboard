const APIKey = "cfd839927ae8a3a54571499306de4d74";

let city = "London";

const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    });