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
  var dateOne = new Date(data.list[5].dt * 1000).toLocaleDateString()
  var dateTwo = new Date(data.list[13].dt * 1000).toLocaleDateString()
  var dateThree = new Date(data.list[21].dt * 1000).toLocaleDateString()
  var dateFour = new Date(data.list[29].dt * 1000).toLocaleDateString()
  var dateFive = new Date(data.list[37].dt * 1000).toLocaleDateString()

  //icon

  iconUrlOne =
    'http://openweathermap.org/img/wn/' +
    data.list[5].weather[0].icon +
    '@2x.png'
  iconUrlTwo =
    'http://openweathermap.org/img/wn/' +
    data.list[13].weather[0].icon +
    '@2x.png'
  iconUrlThree =
    'http://openweathermap.org/img/wn/' +
    data.list[21].weather[0].icon +
    '@2x.png'
  iconUrlFour =
    'http://openweathermap.org/img/wn/' +
    data.list[29].weather[0].icon +
    '@2x.png'
  iconUrlFive =
    'http://openweathermap.org/img/wn/' +
    data.list[37].weather[0].icon +
    '@2x.png'

  var weatherIconOne = document.querySelector('.weather-icon-one')
  var weatherIconTwo = document.querySelector('.weather-icon-two')
  var weatherIconThree = document.querySelector('.weather-icon-three')
  var weatherIconFour = document.querySelector('.weather-icon-four')
  var weatherIconFive = document.querySelector('.weather-icon-five')
  weatherIconOne.setAttribute('src', iconUrlOne)
  weatherIconTwo.setAttribute('src', iconUrlTwo)
  weatherIconThree.setAttribute('src', iconUrlThree)
  weatherIconFour.setAttribute('src', iconUrlFour)
  weatherIconFive.setAttribute('src', iconUrlFive)

  //date
  var dateOneFieldEl = document.querySelector('.header-date-one')
  var dateTwoFieldEl = document.querySelector('.header-date-two')
  var dateThreeFieldEl = document.querySelector('.header-date-three')
  var dateFourFieldEl = document.querySelector('.header-date-four')
  var dateFiveFieldEl = document.querySelector('.header-date-five')
  //temp
  var tempInfoOne = document.querySelector('.temp-info-one')
  var tempInfoTwo = document.querySelector('.temp-info-two')
  var tempInfoThree = document.querySelector('.temp-info-three')
  var tempInfoFour = document.querySelector('.temp-info-four')
  var tempInfoFive = document.querySelector('.temp-info-five')
  //wind
  var windInfoOne = document.querySelector('.wind-info-one')
  var windInfoTwo = document.querySelector('.wind-info-two')
  var windInfoThree = document.querySelector('.wind-info-three')
  var windInfoFour = document.querySelector('.wind-info-four')
  var windInfoFive = document.querySelector('.wind-info-five ')
  //humidity
  var humidityInfoOne = document.querySelector('.humidity-info-one')
  var humidityInfoTwo = document.querySelector('.humidity-info-two')
  var humidityInfoThree = document.querySelector('.humidity-info-three')
  var humidityInfoFour = document.querySelector('.humidity-info-four')
  var humidityInfoFive = document.querySelector('.humidity-info-five')

  dateOneFieldEl.textContent = dateOne
  dateTwoFieldEl.textContent = dateTwo
  dateThreeFieldEl.textContent = dateThree
  dateFourFieldEl.textContent = dateFour
  dateFiveFieldEl.textContent = dateFive

  tempInfoOne.textContent = 'Temp : ' + data.list[5].main.temp + '°F'
  tempInfoTwo.textContent = 'Temp : ' + data.list[13].main.temp + '°F'
  tempInfoThree.textContent = 'Temp : ' + data.list[21].main.temp + '°F'
  tempInfoFour.textContent = 'Temp : ' + data.list[29].main.temp + '°F'
  tempInfoFive.textContent = 'Temp : ' + data.list[36].main.temp + '°F'

  windInfoOne.textContent = 'Wind : ' + data.list[5].wind.speed + ' MPH'
  windInfoTwo.textContent = 'Wind : ' + data.list[13].wind.speed + ' MPH'
  windInfoThree.textContent = 'Wind : ' + data.list[21].wind.speed + ' MPH'
  windInfoFour.textContent = 'Wind : ' + data.list[29].wind.speed + ' MPH'
  windInfoFive.textContent = 'Wind : ' + data.list[36].wind.speed + ' MPH'

  humidityInfoOne.textContent = 'Humidity : ' + data.list[5].main.humidity + '%'
  humidityInfoTwo.textContent =
    'Humidity : ' + data.list[13].main.humidity + '%'
  humidityInfoThree.textContent =
    'Humidity : ' + data.list[21].main.humidity + '%'
  humidityInfoFour.textContent =
    'Humidity : ' + data.list[29].main.humidity + '%'
  humidityInfoFive.textContent =
    'Humidity : ' + data.list[36].main.humidity + '%'
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
      console.log(data)
      displayWeatherForcast(data, cityName)
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
