const openWeatherMapAPIKey = "c0a3944217eb990794e59a8ef9f6e815";
const latitude = 43.65; //Portland, Maine
const longitude = -70.25; // Portland, Maine
const openWeatherForecastFetchURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherMapAPIKey;

fetch (openWeatherForecastFetchURL)
.then (function (response) {
    return response.json();
})
.then (function(data){
    console.log(data);

    theConsoleVariable = data // akaik (but I am probably ignorant) this is the only way to look at fetched data in the interactive console

    // If I had more time, I would look up how to make these arrays like a real programmer:

    conditionsRightNow = [data.list[0].weather[0].description, data.list[0].main.temp, data.list[0].main.humidity, data.list[0].wind.speed];
    conditionsTomorrow = [data.list[8].weather[0].description, data.list[8].main.temp, data.list[8].main.humidity, data.list[8].wind.speed];
    conditionsInTwoDays = [data.list[16].weather[0].description, data.list[16].main.temp, data.list[16].main.humidity, data.list[16].wind.speed];
    conditionsInThreeDays = [data.list[24].weather[0].description, data.list[24].main.temp, data.list[24].main.humidity, data.list[24].wind.speed];
    conditionsInFourDays = [data.list[32].weather[0].description, data.list[32].main.temp, data.list[32].main.humidity, data.list[32].wind.speed];
    conditionsInFiveDays = [data.list[40].weather[0].description, data.list[40].main.temp, data.list[40].main.humidity, data.list[40].wind.speed];

    conditionsArray = [conditionsRightNow, conditionsTomorrow, conditionsInTwoDays, conditionsInThreeDays, conditionsInFourDays, conditionsInFiveDays];
})


/*

[data.list[X].weather[0].description, data.list[X]main.temp, data.list[X]main.humidity, data.list[X]wind.speed]

list[X].weather[0].description
list[X]main.temp (fahrenheit)
list[X]main.humidity (I'm pretty sure humidity is relative)
list[X]wind.speed (miles per hour)

where [X] is three hours into the future
*/