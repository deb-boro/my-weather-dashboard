var apiKey = '995505a9302383e53efa7dfddf3dd184'
var btnSearchEl = document.querySelector('.btn-search')
var inputEl = document.querySelector('.control')
var todayWeatherInfo = document.querySelector('.today-weather')
var arrCityName = []
var displayForcastDayOne = document.querySelector('.display-forcast-day-one')
var displayForcastDayTwo = document.querySelector('.display-forcast-day-two')
var displayForcastDayThree = document.querySelector('display-forcast-day-three')
var displayForcastDayFour = document.querySelector('.display-forcast-day-four')
var displayForcastDayFive = document.querySelector('.display-forcast-day-five')

//Display today's date
var displayTodayDate = function (timeStamp, cityName) {
  const dateVal = new Date(timeStamp * 1000).toLocaleDateString('en-US')
  var todayWeatherCityDate = document.querySelector('.header-info')

  if (todayWeatherCityDate == null || todayWeatherCityDate == undefined) {
    var dateFieldEl = document.createElement('h2')
    dateFieldEl.classList = 'city-date header-info'
    dateFieldEl.textContent = cityName + ' ' + '( ' + dateVal + ' )'
    todayWeatherInfo.appendChild(dateFieldEl)
  } else {
    todayWeatherCityDate.textContent = cityName + ' ' + '( ' + dateVal + ' )'
  }
}

//get UV Index
var getUVIndex = function (cityName) {
  var apiUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    cityName +
    '&limit=5&appid=' +
    apiKey
}
//Display Today's Weather Info
var displayTodayWeatherInfo = function (temperature, humidity, windspeed) {
  var todayWeatherCityDate = document.querySelector('.header-info')
  var existingTempEl = document.querySelector('.temp-info')
  var existingHumidityEl = document.querySelector('.humidity-info')
  var existingWindspeedEl = document.querySelector('.windspeed-info')

  if (existingTempEl == null || existingTempEl == undefined) {
    var tempEl = document.createElement('p')
    tempEl.classList = 'temp-info'
    tempEl.textContent = 'Temperature: ' + temperature + '°F'
    todayWeatherInfo.appendChild(tempEl)
  } else {
    existingTempEl.textContent = 'Temperature: ' + temperature + '°F'
  }
  if (existingHumidityEl == null || existingHumidityEl == undefined) {
    var humidityEl = document.createElement('p')
    humidityEl.classList = 'humidity-info'
    humidityEl.textContent = 'Humidity :' + humidity + ' %'
    todayWeatherInfo.appendChild(humidityEl)
  } else {
    existingHumidityEl.textContent = 'Humidity :' + humidity + ' %'
  }

  if (existingWindspeedEl == null || existingWindspeedEl == undefined) {
    var windSpeedEl = document.createElement('p')
    windSpeedEl.classList = 'windspeed-info'
    windSpeedEl.textContent = 'Windspeed :' + windspeed + ' MPH'
    todayWeatherInfo.appendChild(windSpeedEl)
  } else {
    existingWindspeedEl.textContent = 'Windspeed :' + windspeed + ' MPH'
  }
}

var displayCurrentWeather = function (data, cityName) {
  var timeStamp = data.dt
  var temperature = data.main.temp
  var humidity = data.main.humidity
  var windspeed = data.wind.speed

  //var uvIndex =???

  displayTodayDate(timeStamp, cityName)
  displayTodayWeatherInfo(temperature, humidity, windspeed)
}

var displayWeatherForcast = function (data, cityName) {
  var dateOne = new Date(data.list[8].dt * 1000).toLocaleDateString()
  var dateTwo = new Date(data.list[16].dt * 1000).toLocaleDateString()
  var dateThree = new Date(data.list[24].dt * 1000).toLocaleDateString()
  var dateFour = new Date(data.list[32].dt * 1000).toLocaleDateString()
  var dateFive = new Date(data.list[39].dt * 1000).toLocaleDateString()

  //icon

  iconUrlOne =
    'http://openweathermap.org/img/wn/' +
    data.list[8].weather[0].icon +
    '@2x.png'
  iconUrlTwo =
    'http://openweathermap.org/img/wn/' +
    data.list[16].weather[0].icon +
    '@2x.png'
  iconUrlThree =
    'http://openweathermap.org/img/wn/' +
    data.list[24].weather[0].icon +
    '@2x.png'
  iconUrlFour =
    'http://openweathermap.org/img/wn/' +
    data.list[32].weather[0].icon +
    '@2x.png'
  iconUrlFive =
    'http://openweathermap.org/img/wn/' +
    data.list[39].weather[0].icon +
    '@2x.png'

  var weatherIconOne = document.querySelector('.weather-icon-one')
  weatherIconOne.setAttribute('src', iconUrlOne)

  var dateOneFieldEl = document.querySelector('.header-date-one')
  var weatherConditionOne = document.querySelector('.weather-condition-one')
  var tempInfoOne = document.querySelector('.temp-info-one')
  var windInfoOne = document.querySelector('.wind-info-one')
  var humidityInfoOne = document.querySelector('.humidity-info-one')
  console.log(data)
  dateOneFieldEl.textContent = dateOne
  //weatherConditionOne.textContent=
  tempInfoOne.textContent = 'Temp : ' + data.list[8].main.temp + '°F'
  windInfoOne.textContent = 'Wind : ' + data.list[8].wind.speed + ' MPH'
  humidityInfoOne.textContent = 'Humidity : ' + data.list[8].main.humidity + '%'
}

var getCityWeatherData = function (cityName) {
  console.log('getCityWeather : ' + cityName)
  var apiUrlCurrent =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    apiKey +
    '&units=imperial'
  var apiUrlForcast =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityName +
    '&appid=' +
    apiKey +
    '&units=imperial'

  fetch(apiUrlCurrent).then(function (response) {
    response.json().then(function (data) {
      displayCurrentWeather(data, cityName)
    })
  })
  fetch(apiUrlForcast).then(function (response) {
    response.json().then(function (data) {
      displayWeatherForcast(data, cityName)
    })
  })
}
var saveCityName = function (searchCityName) {
  arrCityName.push(searchCityName)
  existingEntries = JSON.parse(localStorage.getItem('city') || '[]')
  existingEntries.push(arrCityName)
  localStorage.setItem('city', JSON.stringify(existingEntries))
}
var loadSaveCityName = function () {
  var loadCityName = JSON.parse(localStorage.getItem('city'))

  console.log(loadCityName)
}

var btnSearchHandler = function (event) {
  var targetEl = event.target
  if (targetEl.matches('.btn-search')) {
    var searchInputEl = document.querySelector('.input')
    var searchCityName = searchInputEl.value
    saveCityName(searchCityName)
    getCityWeatherData(searchCityName)
    loadSaveCityName()
  }
}

btnSearchEl.addEventListener('click', btnSearchHandler)
