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
//var weatherIconSingle = data.list.weather[0].icon;
//var heatel = $('#bullet')

button
  .addEventListener("click", function (event) {
    event.preventDefault();

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=50a7aa80fa492fa92e874d23ad061374"
      // "https://api.openweathermap.org/geo/1.0/direct?q=" +
      //   input.Value +
      //   "&limit=5&appid=50a7aa80fa492fa92e874d23ad061374"
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
        // fah.innerHTML =
        //   "Fahrenheit - " + (tempValue - 273.15 + 32).toFixed(0) + " &#8457;";
        input.value = "";

        localStorage.setItem("recentSearch", nameValue);

        //console.log(JSON.stringify(data));

        //var listItem = $(input.value);//.val();
        //var heat = $(cels.innerHTML);

        listItemEl.append(
          '<li class="btn btn-primary" onclick="(name)"><h3> ' +
            main.innerHTML +
            '<img src="https://openweathermap.org/img/wn/' +
            weatherIconSingle +
            '.png"></h3> <ul>' +
            cels.innerHTML +
            "<br> " +
            desc.innerHTML +
            "</ul>" +
            "</li>"
        );
        //heatel.append(cels.innerHTML);

        //  nameValue.array.forEach(element => {
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&exclude=minutely,hourly,alerts&units=imperial&appid=2fbcfe867dec88d47dfa684266904944"
        )
          .then((response) => response.json())
          .then((response) => console.log(response))
          .then((data) => {
            console.log(data);
            // -
            var uvi = data.current.clouds;
            console.log(uvi);
          });
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            nameValue +
            "&appid=2fbcfe867dec88d47dfa684266904944"
        )
          .then((response) => response.json())
          // .then((response) => console.log(response.data))
          .then((data) => {
            //const data_1 = JSON.stringify(data);
            // var date = data[i].dt_txt;
            // var setD = date.substr(0, 10);
            // var temp = data[i].main.temp;
            // var hum = data[i]-.main.humidity;
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
              if (i == 5) {
                break;
              }
            }

            var date = data["list"]["dt_text"];
            // var temp_maxValue = data['main']['temp_max'];
            // var temp_minValue = data['main']['temp_min'];
            // var feelsLikeValue = data['main']['feels_like'];
            // Creating a div
            // var fiveDayDiv = $(
            //   "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
            // );

            // //Storing the responses date temp and humidity.......
            // var date = data[i].dt_txt;
            // var setD = date.substr(0, 10);
            // var temp = data[i].main.temp;
            // var hum = data[i].main.humidity;
            // //         console.log(JSON.stringify(results[i].dt_txt));

            // console.log(data);
            // console.log(
            //   data["list"]["0"]["dt_txt"],
            //   data["list"]["0"]["main"]["temp"]
            // );
            // console.log(
            //   data["list"]["8"]["dt_txt"],
            //   data["list"]["8"]["main"]["temp"]
            // );
            // console.log(
            //   data["list"]["16"]["dt_txt"],
            //   data["list"]["16"]["main"]["temp"]
            // );
            // console.log(
            //   data["list"]["24"]["dt_txt"],
            //   data["list"]["24"]["main"]["temp"]
            // );
            // console.log(array.length);
          });
      });

    // console.log(response.json());
    // console.log(JSON.stringify(data));
    //console.log(nameValue)
  })

  .catch((err) => alert("Wrong city name!"));
