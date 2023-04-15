const openWeatherMapAPIKeyA = "c0a3944217eb990794e59a8ef9f6e815";
const openWeatherMapAPIKeyB = "10781a30dfcabf96c7e158d17668332f";
var city = new String;
var openWeatherGCSFetchURL = new String;
var openWeatherForecastFetchURL = new String;
var latitude = new Number;
var longitude = new Number;

function coordinatesFetch(callback) {
    openWeatherGCSFetchURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=0&appid=" + openWeatherMapAPIKeyA;
    fetch(openWeatherGCSFetchURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            preciseLatitude = data[0].lat
            preciseLongitude = data[0].lon
            latitude = preciseLatitude.toFixed(2);
            longitude = preciseLongitude.toFixed(2);
            openWeatherForecastFetchURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherMapAPIKeyB;
            callback(forecastFetch);

            theFirstConsoleVariable = data;
        })
}

function forecastFetch() {
    fetch(openWeatherForecastFetchURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // If I had more time, I would learn how to make these arrays like a real programmer
        // takes the relevant data from every 24 hours (every 8th 3 hour period):

        conditionsRightNow = [data.list[0].weather[0].description, data.list[0].main.temp, data.list[0].main.humidity, data.list[0].wind.speed];
        conditionsTomorrow = [data.list[7].weather[0].description, data.list[7].main.temp, data.list[7].main.humidity, data.list[7].wind.speed];
        conditionsInTwoDays = [data.list[15].weather[0].description, data.list[15].main.temp, data.list[15].main.humidity, data.list[15].wind.speed];
        conditionsInThreeDays = [data.list[23].weather[0].description, data.list[23].main.temp, data.list[23].main.humidity, data.list[23].wind.speed];
        conditionsInFourDays = [data.list[31].weather[0].description, data.list[31].main.temp, data.list[31].main.humidity, data.list[31].wind.speed];
        conditionsInFiveDays = [data.list[39].weather[0].description, data.list[39].main.temp, data.list[39].main.humidity, data.list[39].wind.speed];
        conditionsArray = [conditionsRightNow, conditionsTomorrow, conditionsInTwoDays, conditionsInThreeDays, conditionsInFourDays, conditionsInFiveDays];
        
        theSecondConsoleVariable = data;
        })
}

function getUserInput() {
    globalThis.city = document.getElementById("inputbox").value;
    coordinatesFetch(forecastFetch);
}

getUserInput();

// for reference
// const openWeatherGCSFetchURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"";