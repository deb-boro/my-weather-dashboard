var apiKey = '995505a9302383e53efa7dfddf3dd184'
var btnSearchEl = document.querySelector('.btn-search')
var inputEl = document.querySelector('.control')

var getCityWeather = function (cityName) {
  console.log('getCityWeather : ' + cityName)
  var apiUrl =
    // 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=' +
    // apiKey
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    apiKey +
    '&units=imperial'
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data)
      const timeStamp = 1611214867768

      const dateVal = new Date(timeStamp).toLocaleDateString('en-US')
      console.log(dateVal)
    })
  })
}
var btnSearchHandler = function (event) {
  var targetEl = event.target
  if (targetEl.matches('.btn-search')) {
    var searchInputEl = document.querySelector('.input')
    var inputAreaValue = searchInputEl.value
    getCityWeather(inputAreaValue)
  }
}

btnSearchEl.addEventListener('click', btnSearchHandler)
