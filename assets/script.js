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
var dateStamp = moment().format("MMM DD, YYYY");
//var heatel = $('#bullet')

button
  .addEventListener("click", function (event) {
    event.preventDefault();

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=50a7aa80fa492fa92e874d23ad061374"
    )
      .then((response) => response.json())
      .then((data) => {
        var tempValue = data.main.temp;
        var temp_maxValue = data.main.temp_max;
        var temp_minValue = data.main.temp_min;
        var feelsLikeValue = data.main.feels_like;

        var nameValue = data.name;
        var descValue = data.weather[0].description;

        main.innerHTML = nameValue;
        desc.innerHTML = descValue;
        cels.innerHTML = (tempValue - 273.15).toFixed(0) + "	&#8451;";
        maxTemp.innerHTML =
          "Max Celsius - " + (temp_maxValue - 273.15).toFixed(0);
        minTemp.innerHTML =
          "Min Celsius - " + (temp_minValue - 273.15).toFixed(0);
        feelsLike.innerHTML =
          "Feels Like Celsius - " + (feelsLikeValue - 273.15).toFixed(0);
        fah.innerHTML = "Fahrenheit - " + (tempValue - 273.15 + 32).toFixed(0);
        input.value = "";

        localStorage.setItem("recentSearch", nameValue);

        //console.log(JSON.stringify(data));

        //var listItem = $(input.value);//.val();
        //var heat = $(cels.innerHTML);

        listItemEl.append(
          '<li class="btn btn-primary" onclick="(name)"><h3> ' +
            main.innerHTML +
            "</h3> <ul>" +
            cels.innerHTML +
            " and " +
            desc.innerHTML +
            "</ul>" +
            "</li>"
        );
        //heatel.append(cels.innerHTML);

        //  nameValue.array.forEach(element => {

        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            nameValue +
            "&appid=2fbcfe867dec88d47dfa684266904944"
        )
          .then((response) => response.json())
          .then((data) => {
            //const data_1 = JSON.stringify(data);
            // var date = data[i].dt_txt;
            // var setD = date.substr(0, 10);
            // var temp = data[i].main.temp;
            // var hum = data[i].main.humidity;
            const dataForecast = [];

            for (let i = 0; i < 5; i = i + 1) {
              dataForecast.push(data.list[i * 8] % 5);

              var dateFive = moment(data.list[i * 8].dt_txt).format("DD, MMM");
              //var setD = date.list.substr(0, 10);
              var temp = data.list[i].main.temp;
              var hum = data.list[i].main.humidity;
              var celsfive = (temp - 273.15).toFixed(0) + "	&#8451;";

              list5Day.append(
                '<div class="card col-2"> <div class="card-body"><h5 class="card-title">' +
                  dateFive +
                  '</h5> <h6 class="card-subtitle mb-2 text-muted">' +
                  celsfive +
                  '</h6><p class="card-text">' +
                  hum +
                  "</p></div>"
              );
              if (i == 5) {
                break;
              }
            }
            console.log(dataForecast);

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
