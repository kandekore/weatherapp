var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var cels = document.querySelector(".cels");
var fah = document.querySelector(".fah");
var maxTemp = document.querySelector(".max");
var minTemp = document.querySelector(".min");
var feelsLike = document.querySelector(".feels");
var country = document.querySelector(".flag");
var desc = document.querySelector(".desc");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".submit");
var listItemEl = $("#listitem");
var list5Day = $("#list5day");
var list5DayHead = $("#list5dayhead");
var dateStamp = moment().format("MMM DD, YYYY");
var uvInfo = document.querySelector(".uvbutton");

//var weatherIconSingle = data.list.weather[0].icon;
//var heatel = $('#bullet')

button.addEventListener("click", function (event) {
  event.preventDefault();
  currentWeather(event);
});

function currentWeather(event) {
  var cityName = input.value;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=50a7aa80fa492fa92e874d23ad061374"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var tempValue = data.main.temp;
      var temp_maxValue = data.main.temp_max;
      var temp_minValue = data.main.temp_min;
      var feelsLikeValue = data.main.feels_like;
      var weatherIconSingle = data.weather[0].icon;
      var nameValue = data.name;
      var descValue = data.weather[0].description;
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      console.log(lat);
      console.log(lon);
      main.innerHTML = nameValue;
      desc.innerHTML = descValue;
      cels.innerHTML =
        (tempValue - 273.15).toFixed(0) +
        "	&#8451; /" +
        (tempValue - 273.15 + 32).toFixed(0) +
        " &#8457; ";
      maxTemp.innerHTML =
        "&nbsp;Max temp - " +
        (temp_maxValue - 273.15).toFixed(0) +
        "	&#8451; /" +
        (temp_maxValue - 273.15 + 32).toFixed(0) +
        " &#8457;";
      minTemp.innerHTML =
        "Min - " + (temp_minValue - 273.15).toFixed(0) + "	&#8451;";
      feelsLike.innerHTML =
        "Feels Like - " + (feelsLikeValue - 273.15).toFixed(0) + "	&#8451;";
      input.value = "";

      var textContent = main.innerHTML;
      var storearr = [];
      storearr.push(textContent);
      localStorage.setItem("cityName", main.innerHTML);

      console.log(textContent);
      localStorage.setItem("recentSearch", nameValue);

      console.log(JSON.stringify(data));

      listItemEl.append(
        `<button class='btn btn-primary'> ${main.innerHTML}</button>`
      );

      UviCall(lat, lon);
      forecastCall(nameValue);
    });
}
const uvForecast = [];
function UviCall(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=2fbcfe867dec88d47dfa684266904944"
  )
    .then((response) => response.json())
    //.then((response) => console.log(response))
    .then((info) => {
      console.log(info);
      $(uvInfo).empty;
      html = " ";
      uvForecast.push(info.current % 1);
      var uvi = info.current.uvi;
      console.log(info.current.uvi);
      uvi.innerHTML = uvi;
      console.log(uvi.innerHTML);
      var uvIndHtml = info.current.uvi;
      html +=
        "<button class='btn primarybtn' id= 'uvInfo' > " +
        uvIndHtml +
        "</button>";
      if (info.current.uvi < 3) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:green; color:black; margin-left: 5px"
          );
      } else if (info.current.uvi < 6) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:yellow; color:black; margin-left: 5px"
          );
      } else if (info.current.uvi < 8) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:orange; color:black; margin-left: 5px"
          );
      } else if (info.current.uvi < 11) {
        $(uvInfo)
          .append(html)
          .attr("style", "background-color:red; color:black; margin-left: 5px");
      } else {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:purple; color:black; margin-left: 5px"
          );
      }

      // $(uvInfo).append(
      //   html
      //   // "<button class='btn primarybtn' id= 'uvInfo' > " +
      //   //   uvIndHtml +
      //   //   "</button>"
      // );

      //

      // $(".city").append(uvIndex)
      // var uvIndex = $("<div>")
      // var uvi =$("<div>")
      // uvIndex.text("UV Index: ");
      // uvi.text(data.current.uvi)
      // uvIndex.append(uvi)
      // uvIndex.addClass("d-flex")
    });
}
$(uvInfo).empty();

uvi = "";
function forecastCall(nameValue) {
  console.log("this Worked");
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      nameValue +
      "&appid=2fbcfe867dec88d47dfa684266904944"
  )
    .then((response) => response.json())
    // .then((response) => console.log(response.data))
    .then((data) => {
      list5DayHead.empty();
      list5Day.empty();

      const dataForecast = [];
      list5DayHead.append(
        '<h2 class="heading">Five day Forecast for ' + nameValue + "</h2>"
      );
      for (let i = 0; i < 5; i = i + 1) {
        dataForecast.push(data.list[i * 8] % 5);
        console.log(data);

        var dateFive = moment(data.list[i * 8].dt_txt).format("DD, MMM");
        //var setD = date.list.substr(0, 10);
        var temp = data.list[i].main.temp;
        var hum = data.list[i].main.humidity;
        var celsfive = (temp - 273.15).toFixed(0) + "	&#8451;";
        var farFive = (temp - 273.15 + 32).toFixed(0) + " &#8457;";
        var weatherIcon = data.list[i].weather[0].icon;
        var fiveDayDesc = data.list[i].weather[0].description;
        //var dateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";

        list5Day.append(
          '<div class="card col-2"> <div class="card-body"><h5 class="card-title">' +
            dateFive +
            '<img src="https://openweathermap.org/img/wn/' +
            weatherIcon +
            '.png"' +
            '</h5> <h6 class="card-subtitle mb-2 text-muted">' +
            celsfive +
            " / " +
            farFive +
            '<p class="card-text">' +
            fiveDayDesc +
            "</p>" +
            '</h6><p class="card-text"> Humidity: ' +
            hum +
            "</p></div>"
        );
      }

      var date = data["list"]["dt_text"];
    });
}
function searchButtonHandler(event) {
  var cityName = event.target.innerText;
  var mainCityName = event.target.innerText;

  forecastCall(cityName);
  document.getElementById("myInput").value = event.target.innerText;
  console.log(event.target.id);
  currentWeather(event);
}

listItemEl.on("click", searchButtonHandler);
