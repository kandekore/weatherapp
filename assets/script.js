var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var weatherIconSingle = document.querySelector(".icon");
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

//Recent Search and get from local Storage

var recentSearch =[" "]
let history = localStorage.getItem("recentSearch")
recentSearch.push(history)
if (history === null) {
  var recentSearch =[" "]
}

 else{
document.getElementById('listitem').innerHTML = window.localStorage.getItem('recentSearch').replace(/","/g, "")
      .replace(/[[]/g, "")
      .replace(/]/g, "")
      .replace(/["]/g, "")
      .replace(/[,]/g, "")
      .replace(/\\/g, "");
    }

//Evennt Listener for Search

button.addEventListener("click", function (event) {
  event.preventDefault();
  $(".uvbutton")
  .empty()
  $(".icon")
  .empty()
  $(".date")
  .empty()
 
  currentWeather(event);
  
});

function currentWeather(event) {
  $(".humidity")
  .empty()
  $(".wind")
  .empty()

  var cityName = input.value;
  
  //Add Search History Button
  
  listItemEl.append(
    "<button class='btn btn-primary'>"+cityName+"</button>"
  );

//API FETCH
  
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=50a7aa80fa492fa92e874d23ad061374"
      
  )
 
  
    .then((response) => response.json())
    .then((data) => {
    
    //Organise data for HTML 
      
      console.log(data)
      var weatherIcons = data.weather[0].icon;
      var tempValue = data.main.temp;
      var temp_maxValue = data.main.temp_max;
      var temp_minValue = data.main.temp_min;
      var feelsLikeValue = data.main.feels_like;
      var weatherIconSingle = "<img src='https://openweathermap.org/img/wn/"+weatherIcons+".png>'";
      var nameValue = data.name;
      var descValue = data.weather[0].description;
      var lat = data.coord.lat;
      var lon = data.coord.lon;
     var humidity = data.main.humidity;
     var windspeed = data.wind.speed;
  
     
    
    //HTML Values

      console.log(lat);
      console.log(lon);
      main.innerHTML = nameValue;
      desc.innerHTML = descValue;
      
      // console.log(weatherIconSingle.innerHTML)
      console.log(weatherIconSingle);
      console.log(weatherIconSingle.innerHTML)
      weatherIconSingle.innerHTML = "<img class='iconpic' src='https://openweathermap.org/img/wn/"+weatherIcons+".png'>";
     
      $(".icon").append("<img class='iconpic' src='https://openweathermap.org/img/wn/"+weatherIcons+".png'>");
      cels.innerHTML = "<i class='fa fa-thermometer-half' aria-hidden='true'></i>" +
        (tempValue - 273.15).toFixed(0) +
        "	&#8451; / " +
        (tempValue - 273.15 + 32).toFixed(0) +
        " &#8457; ";
      maxTemp.innerHTML =
        "&nbsp;Maximum Temperature<br>" +
        (temp_maxValue - 273.15).toFixed(0) +
        "	&#8451; / " +
        (temp_maxValue - 273.15 + 32).toFixed(0) +
        " &#8457;";
      minTemp.innerHTML =
        "Minimum Temperature<br>" + (temp_minValue - 273.15).toFixed(0) + "	&#8451; / " + (temp_minValue - 273.15 + 32).toFixed(0) +
        " &#8457;";
      feelsLike.innerHTML =
        "Feels Like<br> " + (feelsLikeValue - 273.15).toFixed(0) + "	&#8451; / " + (feelsLikeValue - 273.15 + 32).toFixed(0) +
        " &#8457;";
        $(".humidity").append("<strong>Humiditiy: " +humidity+"</strong>").text()
        $(".wind").append("<strong>Wind Speed: " +windspeed+"</strong>").text()
      input.value = "";

    //Add to local Storage Array 
    var textContent = main.innerHTML;
      var storearr = [];
      storearr.push(textContent);
      localStorage.setItem("cityName", main.innerHTML);
      

      console.log(textContent);
      recentSearch.push("<button class='btn btn-primary'>"+nameValue+"</button>")
    
    

      function cityStore(){
        
        var newinput = input.value;
        
        recentSearch.push(newinput);
        var cityString = JSON.stringify(recentSearch);
        window.localStorage.setItem("recentSearch", cityString);
        
      
          }
      
      cityStore();

      
    



      console.log(JSON.stringify(data));

      
      

      UviCall(lat, lon);
      forecastCall(nameValue);
      
    })
  
  //Error Catch and alert
   .catch(err => alert("City Name Not Found!"));
}

//second call using lon and lat for UV index 

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
    .then((info) => {
      console.log(info);
      $(uvInfo).empty;  
     
      html = " ";
      uvForecast.push(info.current % 1);
      var uvi = info.current.uvi;
      console.log(info.current.uvi);
      uvi.innerHTML = uvi;
      console.log(uvi.innerHTML);
  
      // var dt = info.current.sunrise;
      var today = moment().format("MMMM Do YYYY");
    
    //UV HTML
 $(".date").append(today)
      html +=
        "UV-Index:<button class='btn primarybtn' id= 'uvInfo' > " +
        uvIndHtml +
        "</button>";
      if (info.current.uvi < 3) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:green; color:black;"
          );
      } else if (info.current.uvi < 6) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:yellow; color:black; "
          );
      } else if (info.current.uvi < 8) {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:orange; color:black;"
          );
      } else if (info.current.uvi < 11) {
        $(uvInfo)
          .append(html)
          .attr("style", "background-color:red; color:black;");
      } else {
        $(uvInfo)
          .append(html)
          .attr(
            "style",
            "background-color:purple; color:black;"
          ) 
      }

    })
    
}
$(uvInfo).empty();

uvi = "";

//five day forcast call 
function forecastCall(nameValue) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      nameValue +
      "&appid=2fbcfe867dec88d47dfa684266904944"
  )
    .then((response) => response.json())
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
        var winds = data.list[i].wind.speed;
        var celsfive = (temp - 273.15).toFixed(0) + "	&#8451;";
        var farFive = (temp - 273.15 + 32).toFixed(0) + " &#8457;";
        var weatherIcon = data.list[i].weather[0].icon;
        var fiveDayDesc = data.list[i].weather[0].description;

        
        //HTML

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
            '</h6><p class="card-text"> Humidity:<br>' +
            hum +
            '</p><p class="card-text"> Wind Speed: ' +
            winds +
            "</p></div>"
        );
      }

      var date = data["list"]["dt_text"];
    })
    // .catch(err => alert("City Name Not Found!"));
}

//Retrive search from search Hostory buttons
function searchButtonHandler(event) {
  var cityName = event.target.innerText;
  var mainCityName = event.target.innerText;
  $(".icon")
  .empty()
  $(".date")
  .empty()
$(uvInfo).empty();
  forecastCall(cityName);
  document.getElementById("myInput").value = event.target.innerText;
  console.log(event.target.id);
  currentWeather(event);
}

listItemEl.on("click", searchButtonHandler);

