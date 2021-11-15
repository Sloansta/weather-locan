let apiKey = '363f8748f69f4f1dd40ec328acffe4b7';
let searchBtn = document.getElementById('search-btn');
let searchField = document.getElementById('city-search');
let currentWeatherEl = document.querySelector('.current-weather');
let fiveDayWeatherEl = document.querySelector('.five-day');
let recentSectionEl = document.querySelector('.recent');
let recentSearch = JSON.parse(localStorage.getItem('recents')) || [];

function getCurrentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchField.value+'&units=imperial&appid=363f8748f69f4f1dd40ec328acffe4b7')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        displayData(data);
        saveToLocal(data.name);
        getFiveDay(data.name);
    }).catch((err) => {
        console.error(err);
    });
}

function searchByBtn(btnName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+btnName+'&units=imperial&appid=363f8748f69f4f1dd40ec328acffe4b7')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        displayData(data);
        saveToLocal(data.name);
        getFiveDay(data.name);
    }).catch((err) => {
        console.error(err);
    });
}

function getFiveDay(location) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+location+
    '&units=imperial&appid=363f8748f69f4f1dd40ec328acffe4b7')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        displayFiveDay(data.list);
    }).catch((err) => {
        console.error(err);
    });
}

function displayRecent() {
    for(i in recentSearch) {
        let locationBtn = document.createElement('button');
        locationBtn.id = 'recent-btn';
        locationBtn.textContent = recentSearch[i];
        recentSectionEl.appendChild(locationBtn);
    }
}

function saveToLocal(name) {
    recentSearch.push(name);
    localStorage.setItem('recents', JSON.stringify(recentSearch));
}

function displayData(data) {
    currentWeatherEl.innerHTML = '<h1> Current weather in '+data.name+
    '</h1> <ul> <li>Temp: '+data.main.temp.toString()+
    '</li><li>Wind Speed: '+data.wind.speed+'MPH</li><li>Humidity: '+data.main.humidity+'%</li></ul>'
}

function displayFiveDay(data) {
    fiveDayWeatherEl.innerHTML = "";
    for(i = 3; i < 64; i += 8) {
        let weatherInfo = document.createElement('div');
        weatherInfo.className = 'weather-block';
        weatherInfo.innerHTML = '<h3>Weather on '+data[i].dt_txt+
        '</h3> <ul><li>Temp: '+data[i].main.temp+
        'F</li><li>Wind Speed: '+data[i].wind.speed+
        'MPH</li><li>Humidity: '+data[i].main.humidity+'%</li></ul>'
        fiveDayWeatherEl.appendChild(weatherInfo);
    }
}

searchBtn.addEventListener('click', () => {
    getCurrentWeather();
    //console.log(searchField.value)
});

recentSectionEl.addEventListener('click', (e) => {
    let btnName = e.target.textContent;
    searchByBtn(btnName);
})

displayRecent();