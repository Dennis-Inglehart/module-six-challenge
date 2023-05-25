const openWeatherMapAPIKeyA = "c0a3944217eb990794e59a8ef9f6e815";
const openWeatherMapAPIKeyB = "10781a30dfcabf96c7e158d17668332f";
var city = new String;
var openWeatherGCSFetchURL = new String;
var openWeatherForecastFetchURL = new String;
var latitude = new Number;
var longitude = new Number;
const todaysDate = new Date();
const weekdayNames = { // declared with "todaysDate.getDay()" in mind
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday", // we need to go past [6] because "todaysDate.getDay() + 1" will be "undefined" on Saturday; it will not know we want it to loop back around to 0
    8: "Monday",
    9: "Tuesday",
    10: "Wednesday",
    11: "Thursday",
};

const todayDiv = document.createElement("div"); todayDiv.setAttribute("class", "today-card");
const tomorrowDiv = document.createElement("div"); tomorrowDiv.setAttribute("class", "forecast-card");
const twoDaysFromNowDiv = document.createElement("div"); twoDaysFromNowDiv.setAttribute("class", "forecast-card");
const threeDaysFromNowDiv = document.createElement("div"); threeDaysFromNowDiv.setAttribute("class", "forecast-card");
const fourDaysFromNowDiv = document.createElement("div"); fourDaysFromNowDiv.setAttribute("class", "forecast-card");
const fiveDaysFromNowDiv = document.createElement("div"); fiveDaysFromNowDiv.setAttribute("class", "forecast-card");

function coordinatesFetch(callback) { // called by the functions that manage user input: processSearchFieldInput() and processHistoryButton()
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
        })
}

function forecastFetch() {
    fetch(openWeatherForecastFetchURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // takes the relevant data from every 24 hours (every 8th 3 hour period):

        conditionsRightNow = [weekdayNames[todaysDate.getDay()], data.list[0].weather[0].description, data.list[0].main.temp, data.list[0].main.humidity, data.list[0].wind.speed];
        conditionsTomorrow = [weekdayNames[todaysDate.getDay() + 1], data.list[7].weather[0].description, data.list[7].main.temp, data.list[7].main.humidity, data.list[7].wind.speed];
        conditionsInTwoDays = [weekdayNames[todaysDate.getDay() + 2], data.list[15].weather[0].description, data.list[15].main.temp, data.list[15].main.humidity, data.list[15].wind.speed];
        conditionsInThreeDays = [weekdayNames[todaysDate.getDay() + 3], data.list[23].weather[0].description, data.list[23].main.temp, data.list[23].main.humidity, data.list[23].wind.speed];
        conditionsInFourDays = [weekdayNames[todaysDate.getDay() + 4], data.list[31].weather[0].description, data.list[31].main.temp, data.list[31].main.humidity, data.list[31].wind.speed];
        conditionsInFiveDays = [weekdayNames[todaysDate.getDay() + 5], data.list[39].weather[0].description, data.list[39].main.temp, data.list[39].main.humidity, data.list[39].wind.speed];
        conditionsArray = [conditionsRightNow, conditionsTomorrow, conditionsInTwoDays, conditionsInThreeDays, conditionsInFourDays, conditionsInFiveDays];
        })
        .then(populateTopRight);
}

function populateTopRight() { // populates the top-right of the window with 6 cards (one for each day) and fills each card (mostly with info from the weather app)

    todayDiv.innerHTML = conditionsRightNow;
    tomorrowDiv.innerHTML = conditionsTomorrow;
    twoDaysFromNowDiv.innerHTML = conditionsInTwoDays;
    threeDaysFromNowDiv.innerHTML = conditionsInThreeDays;
    fourDaysFromNowDiv.innerHTML = conditionsInFourDays;
    fiveDaysFromNowDiv.innerHTML = conditionsInFiveDays;

    document.getElementById("top-right").appendChild(todayDiv);
    document.getElementById("bottom-right").appendChild(tomorrowDiv);
    document.getElementById("bottom-right").appendChild(twoDaysFromNowDiv);
    document.getElementById("bottom-right").appendChild(threeDaysFromNowDiv);
    document.getElementById("bottom-right").appendChild(fourDaysFromNowDiv);
    document.getElementById("bottom-right").appendChild(fiveDaysFromNowDiv);
}

function updateLeftButton(i) { // updates the five buttons with data from localStorage, which is hopefully search history data. Called by storeCityInLocalStorage() (the `i` is the index of its loop)
    document.getElementById(`historybutton-${i}`).textContent = city;
}

function storeCityInLocalStorage() { // called by processSearchFieldInput()
    for (i = 0; i < 5; i++) {                       // <- stops after 5 (so we can't have infinite entries)
        if (localStorage.getItem(i) === city) {     // <- checks if the city name is already in localStorage (so we can't have "Chicago" multiple times)
            break;
        } else {
            if (localStorage.getItem(i) === null) { // <- checks if something else is already in localStorage (so we won't overwrite)
                localStorage.setItem (i, city);
                updateLeftButton(i);
                break;
            }
        }
    }
}

function updateLeftButton(i) { // updates the five buttons with data from localStorage, which is hopefully search history data. The `i` is the `i` from storeCityInLocalStorage()
    document.getElementById(`historybutton-${i}`).querySelector("button").textContent = city;
}

// NOTE: the three functions below are called by index.html (which is bad practice?)

function checkForReturnKey(){
    if (event.key === "Enter") {processSearchFieldInput(event)}}
    
function processSearchFieldInput() {
    globalThis.city = document.getElementById("inputbox").value;
    storeCityInLocalStorage();
    coordinatesFetch(forecastFetch);
}
function processHistoryButton(theKeyFromTheDiv) {
    globalThis.city = localStorage.getItem(theKeyFromTheDiv);
    coordinatesFetch(forecastFetch);
}