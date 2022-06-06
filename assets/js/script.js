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
var btnSearchAddCity = document.querySelector('.btn-add-city')

//Display today's date
var displayTodayDate = function (timeStamp, cityName) {
  const dateVal = new Date(timeStamp * 1000).toLocaleDateString('en-US')
  var todayWeatherCityDate = document.querySelector('.header-info')
  todayWeatherCityDate.textContent = cityName + ' ' + '( ' + dateVal + ' )'
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
  var tempEl = document.querySelector('.temp-info')
  var humidityEl = document.querySelector('.humidity-info')
  var windSpeedEl = document.querySelector('.windspeed-info')
  tempEl.textContent = 'Temperature: ' + temperature + '°F'
  humidityEl.textContent = 'Humidity :' + humidity + ' %'
  windSpeedEl.textContent = 'Windspeed :' + windspeed + ' MPH'
}

var displayCurrentWeather = function (data, cityName) {
  var timeStamp = data.dt
  var temperature = data.main.temp
  var humidity = data.main.humidity
  var windspeed = data.wind.speed
  var icon = data.weather[0].icon

  //var uvIndex =???

  displayTodayDate(timeStamp, cityName)
  var iconUrlZero = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
  var weatherIconZero = document.querySelector('.weather-icon-zero')
  weatherIconZero.setAttribute('src', iconUrlZero)
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

  tempInfoOne.textContent = 'Temp : ' + data.list[8].main.temp + '°F'
  windInfoOne.textContent = 'Wind : ' + data.list[8].wind.speed + ' MPH'
  humidityInfoOne.textContent = 'Humidity : ' + data.list[8].main.humidity + '%'
}

var getCityWeatherData = function (cityName) {
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
      console.log(data)
      displayCurrentWeather(data, cityName)
    })
  })
  fetch(apiUrlForcast).then(function (response) {
    response.json().then(function (data) {
      displayWeatherForcast(data, cityName)
      console.log('api two fetch')
    })
  })
}

var checkArrForCityName = function (existingEntries, cityName) {
  for (var i = 0; i < existingEntries.length; i++) {
    var eachArraySize = existingEntries[i].length
    for (var j = 0; j < eachArraySize; j++) {
      if (existingEntries[i][j] === cityName) {
        return true
      }
    }
  }
  return false
}

var saveCityName = function (searchCityName) {
  arrCityName.push(searchCityName)
  existingEntries = JSON.parse(localStorage.getItem('city') || '[]')
  var isCityInArray = checkArrForCityName(existingEntries, searchCityName)
  if (isCityInArray === false) {
    var buttonEl = document.createElement('button')
    buttonEl.classList = 'button is-info is-fullwidth is-hovered btn-city'
    buttonEl.textContent = searchCityName
    btnSearchAddCity.prepend(buttonEl) //adding element at the start of the container
    existingEntries.unshift(arrCityName) // adding array element at the start of the array
    localStorage.setItem('city', JSON.stringify(existingEntries))
  } else {
    arrCityName.pop()
  }

  // empty the array because in case you don't refresh the page it will create new array with 2 elements
  arrCityName.splice(0, arrCityName.length)
}

var loadSaveCityName = function () {
  var loadCityName = JSON.parse(localStorage.getItem('city'))
  if (loadCityName != null || loadCityName != undefined) {
    for (var i = 0; i < loadCityName.length; i++) {
      var buttonEl = document.createElement('button')
      buttonEl.classList = 'button is-info is-fullwidth is-hovered btn-city'
      buttonEl.textContent = loadCityName[i][0]
      btnSearchAddCity.appendChild(buttonEl)
    }
  }
}

var btnSearchHandler = function (event) {
  var targetEl = event.target
  if (targetEl.matches('.btn-search')) {
    var searchInputEl = document.querySelector('.input')
    var searchCityName = searchInputEl.value.toLowerCase()
    if (
      searchCityName === '' ||
      searchCityName === null ||
      searchCityName === undefined
    ) {
      alert('Please type a city name')
    } else {
      saveCityName(searchCityName)
      getCityWeatherData(searchCityName)
    }
  } else if (targetEl.matches('.btn-city')) {
    searchCityName = targetEl.textContent
    getCityWeatherData(searchCityName)
  }
}

loadSaveCityName()
btnSearchAddCity.addEventListener('click', btnSearchHandler)
btnSearchEl.addEventListener('click', btnSearchHandler)
